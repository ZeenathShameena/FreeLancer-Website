const User = require('../model/Freelancer');
const jobs = require('../model/usermodel');
const Client = require('../model/Client');


exports.profile = async (req, res) => {
  try {
      const {userId, userRole} = req.user;
      if(userRole === 'Freelancer'){
        const works = await User.find({_id: userId});
        return res.status(200).json({
                success: true,
                data: works
        });
      }
        console.log(works)
      } catch (err) {
          return res
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
    const { userId, userRole, email: UserEmail } = req.user; 
    let user

    if(userRole === 'Client'){
      const { name, email, company, profileImage } = req.body; // New profile data
      if(email !== UserEmail) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res
          .status(404)
          .json({ 
            success: false,
            message: 'Error Updating Profile:  Your New Email is already in use' });
        }
      }
      user = await Client.findByIdAndUpdate(
      userId,
      { name, email, company, profileImage },
      { new: true, runValidators: true }
      );
      }
      
      
      else if(userRole === 'Freelancer'){
        const { name, email, skills, experience, earnings, profileImage  } = req.body; // New profile data
        if(email !== UserEmail) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              return res
              .status(404)
              .json({ 
                success: false, 
                message: 'Error Updating Profile:  Your New Email is already in use' });
            }
        }
        user = await User.findByIdAndUpdate(
          userId,
          { name, email, skills, experience, earnings, profileImage },
          { new: true, runValidators: true }
        );
      }

    if (!user) {
      return res
      .status(404)
      .json({ success: false, message: "User not found" });
    }

    res.json({ success: true,  message: "Profile updated successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//Show COMPLETED jobs
exports.completed = async (req, res) => {
  try {
      const {userId}=req.user;
      const works = await jobs.find({"appliedBy._id": userId, status: "Completed"} );
      res.status(200).json({
          success: true,
          message: "Completed Jobs fetched successfully",
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


//Show CURRENT jobs 
exports.currentJobs = async (req, res) => {
  try {
      const {userId}=req.user;
      console.log(userId)
      const works = await jobs.find({status: { $ne: "Completed" } , 
        appliedBy: { 
          $elemMatch: {    // Ensures both conditions are in the same object
            _id: userId, 
            assigned: "Yes" } }
      });
      res.status(200).json({
          success: true,
          message: "Current Jobs fetched successfully",
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

//Show APPLIED jobs
exports.Applied_Jobs = async (req, res) => {
  try {
      const {userId}=req.user;
      const works = await jobs.find({status: { $ne: "Completed" }, appliedBy: { 
        $elemMatch: {    // Ensures both conditions are in the same object
          _id: userId, 
          assigned: "No" } }
        });
      res.status(200).json({
          success: true,
          message: "Applied Jobs fetched successfully",
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


//Show Jobs in Notification
exports.Available_Jobs = async (req, res) => {
  try {
      const {userId} = req.user;
      const works = await jobs.find({status: "Open",
        "appliedBy._id": { $ne: userId }
      })
      .select('title dateTime')
      .sort({ dateTime: -1 }); //Sorting to Show recently posted job First
      res.status(200).json({
          success: true,
          message: "Notification Shown successfully",
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

//Apply for job
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const { userId } = req.user;
    
    // Find freelancer's details
     const freelancer = await User.findOne({_id: userId});
     if (!freelancer) {
       return res.status(401).json({ 
        success: false, 
        message: "Freelancer not found!", });
     }
    // Find the job
    const job = await jobs.findOne({ _id: jobId });
    if (!job) {
			return res
				.status(401)
				.json({ success: false, message: 'Job does not exists!' });
		}
    
    // Check if freelancer has already applied
    const alreadyApplied = job.appliedBy.some(
      (applicant) => applicant._id.toString() === userId
    );
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }
    job.appliedBy.push({
      _id: userId,
      name: freelancer.name,
      appliedAt: new Date(),
    });
    await job.save();
    return res
       .status(200)
       .json({ success: true, message: 'freelancer updated!!' });

  } catch (error) {
    console.error("Error requesting for job:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};