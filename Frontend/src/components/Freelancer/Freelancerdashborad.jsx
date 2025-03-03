import React, { useState, useEffect } from "react";
import "../Freelancer/freelancerdashboard.css";
import axios from "axios";


const FreelancerDashboard = () => {
  // Freelancer details state
  const [freelancer, setFreelancer] = useState({
    name: "shaa",
    email: "",
    skills: "",
    experience: "",
    rating: 4.8,
    totalEarnings: 24,
    profileImage: "",
  });

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for form inputs
  const [formData, setFormData] = useState({ ...freelancer });
  const [notifications, setNotifications] = useState([]);

  const [completedJobs, setcompletedJobs] = useState([]);
  const [currentJobs, setcurrentJobs] = useState([]);
  const [AppliedJobs, setAppliedJobs] = useState([]);


  // Fetch profile data from backend
  useEffect(() => {

    // Getting Freelancer Details from DB
    axios
    .get("http://localhost:4500/api/auth/Fprofile", { 
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      }) 
    .then((response) => {
      console.log("Profile Details:", response.data);
      if (response.data.success ) {  //&& response.data.data.length > 0
        setFreelancer((prev) => ({ ...prev, ...response.data.data[0] })); // Ensures all fields are updated
        setFormData((prev) => ({ ...prev, ...response.data.data[0] }));
      }
    })
    .catch((error) => console.error("Error fetching Profile details:", error));

    //Getting Current Jobs from DB
    axios
    .get("http://localhost:4500/api/auth/currentJobs", { withCredentials: true })
    .then((response) => {
      console.log("Current jobs fetched:", response.data);
      if (response.data.success) {
        setcurrentJobs(response.data.data); 
      }
    })
    .catch((error) => console.error("Error fetching Current jobs:", error));
    
    //Getting Completed Jobs from DB
    axios
    .get("http://localhost:4500/api/auth/Fcompleted", { withCredentials: true })
    .then((response) => {
      console.log("Completed jobs Fetched:", response.data);
      if (response.data.success) {
        setcompletedJobs(response.data.data); 
        // Calculate total salary spent
        const totalSalarySpent = response.data.data.reduce((acc, job) => acc + job.salary, 0);

        // Update client state with totalSpent
        setFreelancer((prevUser) => ({
          ...prevUser,
          totalEarnings: totalSalarySpent,
        }));
        
      }
    })
    .catch((error) => console.error("Error fetching Completed jobs:", error));


    //Getting Applied Jobs from DB
    axios
    .get("http://localhost:4500/api/auth/Applied_Jobs", { withCredentials: true })
    .then((response) => {
      console.log("Applied jobs Fetched:", response.data);
      if (response.data.success) {
        setAppliedJobs(response.data.data); // Set jobs from API response
      }
    })
    .catch((error) => console.error("Error fetching Applied jobs:", error));
    
    
    
    //Notifications
    axios
    .get("http://localhost:4500/api/auth/Available_Jobs", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      console.log("Notifications Response:", response.data);
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setNotifications(response.data.data); // Ensure it's an array before setting state
      } else {
        setNotifications([]); // Fallback to an empty array if data is missing or not an array
      }
    })
    .catch((error) => {
      console.error("Error fetching notifications:", error);
      setNotifications([]); // Ensure notifications state doesn't remain undefined on error
    });

   
  }, []);

  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };


  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    //To Update Profile
    axios
    .patch("http://localhost:4500/api/auth/UpdateProfile", formData, 
        {  headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        })
    .then((response) => {
      console.log("Updated Profile:", response.data);
      if (response.data.success) {
        setFreelancer({...formData}); // Update client state with edited data
        setShowModal(false); // Close modal
        alert(response.data.message)
      } 
    })
    .catch((error) => {
      if(error.response)
      {
        alert(error.response.data.message);
      }
      console.error("Error updating Freelancer details:", error)
    });
    
  };
  
const [appliedJobs, setappliedJobs] = useState([]);
useEffect(() => {
  // Load applied jobs from localStorage
  const storedAppliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  setappliedJobs(storedAppliedJobs);
}, []);

const handleApply = async (jobId) => {
  try {
    const response = await axios.post(
      "http://localhost:4500/api/auth/applyJob", {jobId},
      { withCredentials: true }
    );

    if (response.data.success) {
      alert("Applied successfully!");
      //const updatedAppliedJobs = [...appliedJobs, jobId]; //LocalStorage
      setappliedJobs([...appliedJobs, jobId]);
      //localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs));
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error applying for job:", error);
    alert(error.response.data.message);
  }
};

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Profile Overview */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <div className="text-center position-relative">
              <img
                src={freelancer.profileImage}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
              />
              {/* Image Upload Icon */}
              {/* <label
                htmlFor="imageUpload"
                className="position-absolute bottom-0 start-50 translate-middle bg-primary text-white rounded-circle p-1"
                style={{ cursor: "pointer" }}
              >
                📷
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="d-none"
                onChange={(e) => {
                  handleImageUpload(e);
                  setFreelancer({
                    ...freelancer,
                    profileImage: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              /> */}
              <h5>{freelancer.name}</h5>
              <p className="text-muted">{freelancer.email}</p>
            </div>
            <hr />
            <p>
              <strong>Skills:</strong> {freelancer.skills}
            </p>
            <p>
              <strong>Experience:</strong> {freelancer.experience}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {freelancer.rating} / 5
            </p>
            <p>
              <strong>Total Earnings:</strong> ${freelancer.totalEarnings}
            </p>

            {/* Button to Show Modal */}
            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Modal for Editing Profile */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Image Upload in Modal */}
                    <div className="mb-3 text-center">
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="rounded-circle mb-1"
                        width="80"
                      />
                      <input
                        type="file"
                        id="modalImageUpload"
                        accept="image/*"
                        className="d-none"
                        onChange={handleImageUpload}
                      />
                      <div className="position-relative ">
                        <button
                          type="button"
                          className="btn btn-outline-primary mb-3 top-2"
                          onClick={() =>
                            document.getElementById("modalImageUpload").click()
                          }
                        >
                          Upload Image
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Skills</label>
                      <input
                        type="text"
                        name="skills"
                        className="form-control"
                        value={formData.skills}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        className="form-control"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Total Earnings</label>
                      <input
                        type="text"
                        name="totalEarnings"
                        className="form-control"
                        value={formData.totalEarnings}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Section: Jobs and Notifications */}
        <div className="col-md-8">
          {/* <div className="card p-3 shadow mb-4">
            <h5>Current Jobs</h5>
            <ul className="list-group">
              <li className="list-group-item">
                E-commerce Website (Deadline: 10 Feb 2025)
              </li>
              <li className="list-group-item">
                Portfolio Website (Deadline: 15 Feb 2025)
              </li>
            </ul>
          </div> */}

          {/* Current Jobs */}
          <div className="card p-3 shadow mb-4">
            <h5>Current Jobs</h5>
            <ul className="list-group">
              {currentJobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  {job.title}{" "}
                </li>
              ))}
            </ul>
          </div>

          {/* Completed Jobs */}
          <div className="card p-3 shadow mb-4">
            <h5>Completed Jobs</h5>
            <ul className="list-group">
              {completedJobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  {job.title}{" "}
                  <span className="text-success">(Spent: ${job.salary})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-3 shadow">
            <h5>Notifications</h5>
            <ul className="list-group">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                     <li key={index} className="list-group-item">
                      <strong>{notification.title}</strong> <br />
                      <small>{new Date(notification.dateTime).toLocaleString()}</small> {/* Format date */}
                      <br />

                      {/* Apply Button */}
                      <button 
                      className="btn btn-primary mt-2"
                      onClick={() => handleApply(notification._id)}
                      disabled={appliedJobs.includes(notification._id)} // Disable if already applied
                      >
                         {appliedJobs.includes(notification._id) ? "Applied" : "Apply"}
                      </button>
                    </li>
                  ))
               ) : (
                <li className="list-group-item text-muted">No new notifications</li>
               )}
            </ul>
          </div>

          <div className="card p-3 shadow">
            <h5>Jobs Applied</h5>
            <ul className="list-group">
                {AppliedJobs.length > 0 ? (
                    AppliedJobs.map((Job) => (
                     <li key={Job.id} className="list-group-item">
                      <strong>{Job.title}</strong> <br />

                      {/* Apply Button */}
                      <button 
                      className="btn btn-primary mt-2"
                      >
                       Applied
                      </button>
                    </li>
                  ))
               ) : (
                <li className="list-group-item text-muted">No Jobs Applied</li>
               )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
export default FreelancerDashboard;