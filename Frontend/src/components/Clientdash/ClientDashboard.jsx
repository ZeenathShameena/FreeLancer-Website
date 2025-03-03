import React, { useState, useRef, useEffect } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Hiring from "./../Hiring"; // Import Hiring Component
import "../Clientdash/clientdashboard.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; 



const ClientDashboard = () => {
  // Client details
  const [client, setClient] = useState({
    name: "",
    email: "",
    company: "",
    totalJobsPosted: 12,
    totalSpent: 24,
    profileImage: "",
  });

const [jobs, setJobs] = useState([
  {
    id: 1,
    title: "React Developer Needed",
    description: "Looking for a React developer to build a new UI.",
    budget: "$2000",
    date: "2025-02-14",
    workType: "Remote",
    jobType: "Full-Time",
    status: "Open",
  },
  {
    id: 2,
    title: "Graphic Designer for Logo",
    description: "Need a creative logo for our brand.",
    budget: "$500",
    date: "2025-02-12",
    workType: "Onsite",
    jobType: "Intern",
    status: "In Progress",
  },
]);

const [completedJobs, setcompletedJobs] = useState([
  { id: 1, title: "E-commerce Website Development", spent: "$2500" },
  { id: 2, title: "SEO Optimization", spent: "$1200" },
]);

const hiringModalRef = useRef(null);
const editModalRef = useRef(null);
const [editFormData, setEditFormData] = useState(client);

const location=useLocation()

useEffect(() => {

  // Initialize Bootstrap Modals
  import("bootstrap/dist/js/bootstrap.bundle.min").then((bootstrap) => {
          new bootstrap.Modal(hiringModalRef.current);
          new bootstrap.Modal(editModalRef.current);
  });


  // Getting Client Details from DB
  axios
  .get("http://localhost:4500/api/auth/profile", { 
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }) 
  .then((response) => {
    console.log("Profile Data:", response.data);
    if (response.data.success ) {  
      setClient((prev) => ({ ...prev, ...response.data.data[0] })); // Ensures all fields are updated
      setEditFormData((prev) => ({ ...prev, ...response.data.data[0] }));
    }
  })
  .catch((error) => console.error("Error fetching client profile details:", error));
  

  //Getting Active Jobs from DB
  axios
    .get("http://localhost:4500/api/auth/Show_Works", { withCredentials: true })
    .then((response) => {
      console.log("Active jobs Fetched:", response.data);
      if (response.data.success) {
        setJobs(response.data.data); // Set jobs from API response
      }
    })
    .catch((error) => console.error("Error fetching Active jobs:", error));


  //Getting Completed Jobs from DB
  axios
  .get("http://localhost:4500/api/auth/completed", { withCredentials: true })
  .then((response) => {
    console.log("Completed jobs Fetched:", response.data);
    if (response.data.success) {
      setcompletedJobs(response.data.data); // Set jobs from API response

      // Calculate total salary spent
      const totalSalarySpent = response.data.data.reduce((acc, job) => acc + job.salary, 0);

      // Update client state with totalSpent
      setClient((prev) => ({
        ...prev,
        totalSpent: totalSalarySpent,
      }));

    }
  })
  .catch((error) => console.error("Error fetching Completed jobs:", error));

}, []);


// Handle Profile Edit Input Change
const handleEditChange = (e) => {
  setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
};

//const fileInputRef = useRef(null);

// Function to handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setEditFormData({ ...editFormData, profileImage: imageUrl });
  }

  // if (file) {
  //   setEditFormData((prev) => ({ ...prev, profileImage: file })); // Store file
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setClient((prev) => ({ ...prev, profileImage: reader.result }));
  //   };
  //   reader.readAsDataURL(file);
  // } 
}; 

// Save Edited Profile Data
const handleSaveProfile = (e) => {
  e.preventDefault();

  //To Update Profile
  axios
  .patch("http://localhost:4500/api/auth/UpdateProfile", editFormData, 
      {  headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
  .then((response) => {
    console.log("Updated Profile Details:", response.data);
    if (response.data.success) {
      alert(response.data.message)
      setClient(editFormData); // Update client state with edited data
      document.getElementById("editProfileModalClose").click(); // Close Modal
    } else {
      alert(response.data.message)
    }
  })
  .catch((error) => {
    if (error.response){   //} && error.response.status === 404) {
      alert(error.response.data.message); 
    }
    console.error("Error updating client profile:", error);
  });
};


const handleAcceptFreelancer = async (jobId, freelancerId) => {
  try {
    const response = await axios.patch(
      `http://localhost:4500/api/auth/assign`, // API route
      { jobId, freelancerId }, // Send job ID & freelancer ID
      { withCredentials: true }
    );

    if (response.data.success) {
      alert(response.data.message);
      // Update UI: Set assigned = "Yes"
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                appliedBy: job.appliedBy.map((freelancer) =>
                  freelancer._id === freelancerId
                    ? { ...freelancer, assigned: "Yes" }
                    : freelancer
                ),
              }
            : job
        )
      );
    }
  } catch (error) {
    console.error("Error updating freelancer assignment:", error);
  }
};


const handleStatusChange = async (event, jobId) => {
  const newStatus = event.target.value; // Get selected status

  try {
    const response = await axios.put(
      `http://localhost:4500/api/auth/updateStatus/${jobId}`,
      { status: newStatus }
    );

    if (response.data.success) {
      alert(response.data.message)
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } else {
      alert("Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Client Profile */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <div className="text-center position-relative">
              {/* Edit Icon */}
              <span
                className="position-absolute top-0 end-0 m-2 text-primary"
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                <PencilSquare size={20} />
              </span>
              {/* Profile Image (Click to Upload) */}
              <img
                src={client.profileImage ? client.profileImage : "https://robohash.org/default-profile.png"}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
                style={{ cursor: "pointer" }}
              />
              <h5>{client.name}</h5>
              <p className="text-muted">{client.email}</p>
            </div>
            <hr />
            <p>
              <strong>Company:</strong> {client.company}
            </p>
            <p>
              <strong>Total Jobs Posted:</strong> {client.totalJobsPosted}
            </p>
            <p>
              <strong>Total Spent: </strong><span className="text-success">${client.totalSpent}</span>
            </p>
          </div>
        </div>

        {/* Right Section: Job Management */}
        <div className="col-md-8">
          {/* Post Job Button */}
          <button
            className="btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#hiringModal"
          >
            Post New Job
          </button>

          {/* Hiring Modal */}
          <div
            className="modal fade"
            id="hiringModal"
            ref={hiringModalRef}
            tabIndex="-1"
            aria-labelledby="hiringModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Post a New Job</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Hiring setJobs={setJobs} jobs={jobs} />
                </div>
              </div>
            </div>
          </div>

          {/* Active Job Listings */}
          <div className="card p-3 shadow mb-4">
            <h5>Active Jobs</h5>
            <ul className="list-group">
              {jobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  <p className="mt-2">
                  <strong>{job.title}</strong> <br />
                  <small className="text-muted">{job.description}</small> <br />
                  <span className="text-muted"><strong>Budget: </strong>{job.salary}</span> <br />
                  {/* <span className="text-primary">
                    {" "}
                    {job.workType} - {job.workType}
                  </span>{" "} */}
                  <span className="text-muted"><strong>Work Type: </strong>{job.workType}</span> <br />
                  <span className="text-success"> Posted on: {new Date(job.dateTime).toLocaleString()}</span>
                  <br /></p>


                   {/* Show applied freelancers */}
                  {job.appliedBy && job.appliedBy.length > 0 ? (
                    <p className="mt-2">
                      <strong>Applied By:</strong>{" "}
                      {job.appliedBy.map((freelancer) => (
                        <span key={freelancer._id} className="d-flex align-items-center gap-2">
                        <span className="text-success">{freelancer.name}</span>
                        {/* Show Accept button only if assigned is "No" */}
                        {freelancer.assigned === "No" && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleAcceptFreelancer(job._id, freelancer._id)}
                          >
                            Accept
                          </button>
                        )}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className="text-muted mt-2">No applicants yet</p>
                  )}


                {/* Status Dropdown */}
                <select
                  className="form-select form-select-sm mt-2 w-auto" 
                  style={{ maxWidth: "90px", fontSize: "15px", padding: "3px 4px", height: "40px"  }} // Reduce size further
                  value={job.status}  // Ensure it uses job.status
                  onChange={(event) => handleStatusChange(event, job._id)}  // Pass job ID
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Completed">Completed</option>
                </select>
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
        </div>
      </div>



      {/* Edit Profile Modal */}
      <div
        className="modal fade"
        id="editProfileModal"
        ref={editModalRef}
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="editProfileModalClose" //id used to point the model
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveProfile}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={editFormData.company}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Image URL</label>
                  <img
                        src={editFormData.profileImage}
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
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
