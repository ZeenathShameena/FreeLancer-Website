import React, { useState } from "react";
import "../Clientdash/clientdashboard.css";
import axios from "axios";

const ClientDashboard = () => {
  // Client details
  const client = {
    name: "vaishnavi",
    email: "vaishnavi@example.com",
    company: "Tech Solutions Inc.",
    totalJobsPosted: 12,
    totalSpent: "$15,800",
    profileImage: "./assets/pic04.jpg", // Placeholder image
  };

  // State for job postings
  const [jobs, setJobs] = useState([
    { id: 1, title: "React Developer Needed", status: "Open" },
    { id: 2, title: "Graphic Designer for Logo", status: "In Progress" },
  ]);

  const [completedJobs] = useState([
    { id: 1, title: "E-commerce Website Development", spent: "$2500" },
    { id: 2, title: "SEO Optimization", spent: "$1200" },
  ]);


  
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobBudget, setJobBudget] = useState("");

  // Handle new job posting
  const handlePostJob = (e) => {
    e.preventDefault();
      const newJob = {
        id: jobs.length + 1,
        title: jobTitle,
        description: jobDescription,
        budget: jobBudget,
        status: "Open",
      };
    
      setJobs([...jobs, newJob]);
      setJobTitle("");
      setJobDescription("");
      setJobBudget("");
    
    try {
      console.log(jobTitle,
        jobDescription,
        jobBudget)
      axios.post("http://localhost:4500/api/auth/post", newJob)
      .then(res => {
          if (res.data.success) {
            alert("Your Post Submitted Succesfully!")
          }
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          alert(error.response.data.message);
        }else{
            alert("An error occurred. Please try again.");
        }
      });
  } catch (e) {
      console.log(e);
  }

  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Client Profile */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <div className="text-center">
              <img
                src={client.profileImage}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
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
          {/* Job Posting Form */}
          <div className="card p-3 shadow mb-4">
            <h5>Post a New Job</h5>
            <form onSubmit={handlePostJob}>
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Job Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={jobDescription}
                  name="jobDescription"
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Budget ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="jobBudget"
                  value={jobBudget}
                  onChange={(e) => setJobBudget(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
            </form>
          </div>

          {/* Active Job Listings */}
          <div className="card p-3 shadow mb-4">
            <h5>Active Jobs</h5>
            <ul className="list-group">
              {jobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  {job.title} <span className="text-muted">({job.status})</span>
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

          {/* Freelancer Applications (Dummy Data) */}
          <div className="card p-3 shadow">
            <h5>Freelancer Applications</h5>
            <ul className="list-group">
              <li className="list-group-item">
                John Doe applied for "React Developer Needed"
              </li>
              <li className="list-group-item">
                Jane Smith applied for "Graphic Designer for Logo"
              </li>
              <li className="list-group-item">Alex Brown sent a message</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;