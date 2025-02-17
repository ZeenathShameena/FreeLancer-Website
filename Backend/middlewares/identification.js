const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
	let token;
	if (req.headers && req.headers.client === 'not-browser') {
		token = req.headers.authorization;
	} else {
		token = req.cookies['Authorization'];
	}


	console.log("Request Headers:", req.headers);
    console.log("Request Cookies:", req.cookies);
    console.log("Recevied File:", req.file);


	if (!token) {
		return res.status(403).json({ success: false, message: 'No Token -Unauthorized' });
	}

	try {
		const userToken = token.split(' ')[1];
		const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);
		if (jwtVerified) {
			req.user = jwtVerified;
			console.log(jwtVerified)
			next();
		} else {
			throw new Error('error in the token');
		}
	} catch (error) {
		console.log("Token verification error",error);
		return res.status(401).json({ success: false, message: "Invalid Token" });
	}
};