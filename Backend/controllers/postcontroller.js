const User = require('../model/Freelancer');
const jobs = require('../model/usermodel');
const Client = require('../model/Client');


//show prfile
exports.profile = async (req, res) => {
  try {
      const {userId, userRole} = req.user;
      if(userRole === 'Client'){
        const works = await Client.find({_id: userId});
        res.status(200).json({
          success: true,
          works
        });
        console.log(works)
      }else{
        const data = await User.find({_id: userId});
        res.status(200).json({
          success: true,
          data
        });
      }
      } catch (err) {
          res
            .status(500)
            .json({ 
              success: false, 
              message: "Server Error", 
              error: 'Database query failed' });
        }
}


//Add Job
exports.submit = async (req, res) => {
    try {
        const {email} = req.user;
        const data = req.body;
        data.email=email  //adding the user email to the post
		    const newUser = new jobs(data);

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


//Show Active jobs posted by Client in their Dashboard
exports.Show_Works = async (req, res) => {
    try {
        const {email}=req.user;
        const works = await jobs.find({email:email});
        res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: works
        });
    } catch (err) {
        res
		.status(500)
		.json({ 
			success: false, 
			message: "Server Error", 
			error: 'Database query failed' });
    }
}

//Update Profile
exports.UpdateProfile = async (req, res) => {
    try {
      //console.log(req.user)
      //console.log("File received:", req.file);
      //console.log("Other data:", req.body);  
      
      //const imageUrl = `http://localhost:4500/uploads/${req.file.filename}`; // Construct image URL
      const { userId, userRole } = req.user; // Get userId from token
      let client
      if(userRole === 'Client'){
        const { name, email, company,profileImage } = req.body; // New profile data
         client = await Client.findByIdAndUpdate(
          userId,
          { name, email, company, profileImage },
          { new: true, runValidators: true }
        );
        }else if(userRole === 'Freelancer'){
          const { name, email, skills, expirience, earnings, profileImage } = req.body; // New profile data
          client = await User.findByIdAndUpdate(
            userId,
            { name, email, skills, expirience, earnings, profileImage },
            { new: true, runValidators: true }
          );
        }
      if (!client) {
        return res
        .status(404)
        .json({ success: false, message: "Client not found" });
      }
      res.json({ success: true,  message: "Profile updated successfully", user: client });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };


  //Show Jobs in Notification
  exports.Available_Jobs = async (req, res) => {
    try {
        const works = await jobs.find({ status: "Open" }).select('title');
        res.status(200).json({
            success: true,
            message: "Jobs Shown successfully",
            works
        });
    } catch (err) {
        res
          .status(500)
          .json({ 
            success: false, 
            message: "Server Error", 
            error: 'Database query failed' });
    }
}
