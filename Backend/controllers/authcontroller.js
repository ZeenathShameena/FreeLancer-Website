const jwt = require('jsonwebtoken');
const User = require('../model/loginmodel');
const User2 = require('../model/usermodel');

const {
	signupSchema,
	acceptFPCodeSchema,
} = require('../middlewares/validator');
const { doHash, doHashValidation, hmacProcess } = require('../utils/hashing');
const transport = require('../middlewares/sendMail');



exports.register = async (req, res) => {
	const { name, email, password, userRole} = req.body;
	try {

		 const { error, value } = signupSchema.validate({ email, password });
		 if (error) {
		 	return res
		 		.status(401)
		 		.json({ success: false, message: error.details[0].message });
		 }

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			console.log("User already exists!")
			return res
				.status(401)
				.json({ success: false, message: 'User already exists!' });
		}

		const hashedPassword = await doHash(password, 12);
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			userRole,
		});
		const result = await newUser.save();
		result.password = undefined;
		console.log("account has been created")
		res
		.status(201).json({
			success: true,
			message: 'Your account has been created successfully',
			result,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email }).select('+password +userRole');
		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists Please SignUp first!' });
		}
		const result = await doHashValidation(password, existingUser.password);
		if (!result) {
			return res
				.status(402)
				.json({ success: false, message: 'Invalid Password!' });
		}
		const token = jwt.sign(
			{
				userId: existingUser._id,
				email: existingUser.email,
				verified: existingUser.verified,
				userRole: existingUser.userRole,
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: '8h',
			}
		);
		res
			.cookie('Authorization', 'Bearer ' + token, {
				expires: new Date(Date.now() + 8 * 3600000),
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
			})
			.json({
				success: true,
				message: existingUser.userRole === 'Freelancer' ? 'Freelancer' : 'Client',
			});
	} catch (error) {
		console.log(error);
	}
};

exports.sendForgotPasswordCode = async (req, res) => {
	const { email } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res
				.status(404)
				.json({ success: false, message: 'User does not exists!' });
		}

		const codeValue = Math.floor(Math.random() * 1000000).toString();
		let info = await transport.sendMail({
			from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
			to: existingUser.email,
			subject: 'Forgot password code',
			html:
			 `<h1>Your Code to reset Freelancing App Password ${codeValue}</h1>`,
		});

		if (info.accepted[0] === existingUser.email) {
			const hashedCodeValue = hmacProcess(
				codeValue,
				process.env.HMAC_VERIFICATION_CODE_SECRET
			);
			existingUser.forgotPasswordCode = hashedCodeValue;
			existingUser.forgotPasswordCodeValidation = Date.now();
			await existingUser.save();
			return res.status(200).json({ success: true, message: 'Code sent!' });
		}
		res.status(400).json({ success: false, message: 'Code sent failed!' });
	} catch (error) {
		console.log(error);
	}
};


exports.verifyForgotPasswordCode = async (req, res) => {
	const { email, providedCode, newPassword } = req.body;
	try {
		const { error, value } = acceptFPCodeSchema.validate({
			email,
			providedCode,
			newPassword,
		});
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const codeValue = providedCode.toString();
		const existingUser = await User.findOne({ email }).select(
			'+forgotPasswordCode +forgotPasswordCodeValidation'
		);

		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists!' });
		}

		if (
			!existingUser.forgotPasswordCode ||
			!existingUser.forgotPasswordCodeValidation
		) {
			return res
				.status(400)
				.json({ success: false, message: 'something is wrong with the code!' });
		}

		if (
			Date.now() - existingUser.forgotPasswordCodeValidation >
			5 * 60 * 1000
		) {
			return res
				.status(400)
				.json({ success: false, message: 'code has been expired!' });
		}

		const hashedCodeValue = hmacProcess(
			codeValue,
			process.env.HMAC_VERIFICATION_CODE_SECRET
		);

		if (hashedCodeValue === existingUser.forgotPasswordCode) {
			const hashedPassword = await doHash(newPassword, 12);
			existingUser.password = hashedPassword;
			existingUser.forgotPasswordCode = undefined;
			existingUser.forgotPasswordCodeValidation = undefined;
			await existingUser.save();
			return res
				.status(200)
				.json({ success: true, message: 'Password updated!!' });
		}
		return res
			.status(400)
			.json({ success: false, message: 'unexpected occured!!' });
	} catch (error) {
		console.log(error);
	}
};


exports.submit = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.jobFile = req.file.filename;
        } else {
            return res.status(500).json({
                success: false,
                message: "No file uploaded. Please select a file."
            });
        }
		const newUser = new User2(data);

        const result = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Your data has been added',
            result
        });

        }catch (err) {
            console.error("Error saving user:", err);
            res.status(500).json({ 
				success: false,
				message: err.message 
				 });
        }
};
exports.Show_Works = async (req, res) => {
    try {
        const works = await User2.find(); 
        res.json(works);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
}