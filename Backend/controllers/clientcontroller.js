const jobs = require('../model/usermodel');
const Client = require('../model/Client');


//show prfile
exports.profile = async (req, res) => {
  try {
      const {userId, userRole} = req.user;
      if(userRole === 'Client'){
        const works = await Client.find({_id: userId});
        return res.status(200).json({
                success: true,
                data: works
        });
        }
      } catch (err) {
          res
            .status(500)
            .json({ 
              success: false, 
              message: "Server Error", 
              error: 'Database query failed with profile' });
        }
}


//Post Job
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
        const works = await jobs.find({email:email, status:  { $in: ["Open", "Closed"] }} );
        res.status(200).json({
            success: true,
            message: "Active Jobs fetched successfully",
            data: works
        });
    } catch (err) {
        res
        .status(500)
        .json({ 
            success: false, 
            message: "Server Error", 
            error: 'Database query failed with Active Jobs' });
    }
}


//Show COMPLETED jobs in Client Dashboard
exports.completed = async (req, res) => {
  try {
      const {email}=req.user;
      const works = await jobs.find({email:email, status: "Completed"} );
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
    error: 'Database query failed with completed jobs' });
  }
}


// To update Status Button
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const job = await jobs.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    job.status = status;
    await job.save();

    res.json({ success: true, message: "Status updated successfully", job });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Server error with updating status" });
  }
};

//To asssign job to freelancer
exports.assign = async (req, res) => {
    try {
      const { jobId, freelancerId } = req.body;
  
      const updatedJob = await jobs.findOneAndUpdate(
        { _id: jobId, "appliedBy._id": freelancerId },
        { $set: { "appliedBy.$.assigned": "Yes" } }, // Update assigned field
        { new: true }
      );
  
      if (!updatedJob) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
  
      res.json({ success: true, message: "Freelancer assigned successfully", data: updatedJob });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error with assigning job", error });
    }
  };
  