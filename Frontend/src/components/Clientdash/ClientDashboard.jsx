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
    totalSpent: "",
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

  const [completedJobs] = useState([
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

    //Getting Current_Jobs from DB
    axios
      .get("http://localhost:4500/api/auth/Show_Works", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setJobs(response.data.data); // Set jobs from API response
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));

    // Getting Client Details from DB
    axios
    .get("http://localhost:4500/api/auth/profile", { withCredentials: true })
    .then((response) => {
      if (response.data.success) {
        setClient(response.data.client); // Set client details from API response
        setEditFormData(response.data.client); // Pre-fill edit form
      }
    })
    .catch((error) => console.error("Error fetching client details:", error));

  }, []);




  const fileInputRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClient((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  // Handle Profile Edit Input Change
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
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
      if (response.data.success) {
        console.log("Profile updated:", response.data);
        setClient(editFormData); // Update client state with edited data
        document.getElementById("editProfileModalClose").click(); // Close Modal
      } else {
        console.error("Failed to update client details");
      }
    })
    .catch((error) => console.error("Error updating client details:", error));




    setClient(editFormData);
    document.getElementById("editProfileModalClose").click(); // Close Modal
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
                src={client.profileImage || "https://via.placeholder.com/100"}
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
              <strong>Total Spent:</strong> {client.totalSpent}
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
                  <strong>{job.title}</strong> <br />
                  <small className="text-muted">{job.description}</small> <br />
                  <span className="text-muted">Budget: {job.salary}</span> |
                  {/* <span className="text-primary">
                    {" "}
                    {job.workType} - {job.workType}
                  </span>{" "} */}
                  <span className="text-muted">Work Type: {job.workType}</span> |
                  |<span className="text-success"> Posted on: {job.dateTime}</span>
                  <br />
                  <span className="btn btn-secondary text-center">
                    {job.status}
                  </span>
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
                  <span className="text-success">(Spent: {job.spent})</span>
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
                id="editProfileModalClose"
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {/* Profile Image (Click to Upload) */}
                  {/* <img
                    src={
                      client.profileImage || "https://via.placeholder.com/100"
                    }
                    alt="Profile"
                    className="rounded-circle mb-3"
                    width="100"
                    style={{ cursor: "pointer" }}
                    onClick={() => fileInputRef.current.click()} // Trigger file input
                  /> */}
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
