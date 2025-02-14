const User = require('../model/postmodel');


exports.post = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newUser = new User(data);
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


exports.AddData = async (req, res) => {
    try {
        const works = await User.find();
        console.log("Fetched Jobs:", works); 
        res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: works
        });

        }catch (err) {
            console.error("Error fetching freelancer jobs:", err);
            res.status(500).json({ 
                success: false,
                message: err.message 
                 });
        }
};






        //const { userId  } = req.user;
                //User({
            //...data,  // Spread the existing request body data
            //_id: userId,  // Add userId from token
        //});

