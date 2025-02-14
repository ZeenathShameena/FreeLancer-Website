import React, { useState, useEffect } from "react";
import "../Freelancer/freelancerdashboard.css";
import axios from "axios";


const FreelancerDashboard = () => {
  // Sample data for freelancer details
  const freelancer = {
    name: "vijay",
    email: "vijay@example.com",
    skills: ["React.js", "Node.js", "reactNative"],
    experience: "2 Years",
    rating: 4.8,
    totalEarnings: "$12,500",
    profileImage: "./assets/pic04.jpg", // Placeholder image
  };

  // Sample data for current and completed jobs
  // const [currentJobs] = useState([
  //   { id: 1, title: "E-commerce Website", deadline: "10 Feb 2025" },
  //   { id: 2, title: "Portfolio Website", deadline: "15 Feb 2025" },
  // ]);

  const [currentJobs, setCurrentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [completedJobs] = useState([
    { id: 1, title: "Landing Page Design", earnings: "$300" },
    { id: 2, title: "Blog Website", earnings: "$500" },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/auth/AddData") // Call your backend API
      .then((response) => {
        if (response.data.success) {
          setCurrentJobs(response.data.data); // Store jobs in state
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Profile Overview */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <div className="text-center">
              <img
                src={freelancer.profileImage}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
              />
              <h5>{freelancer.name}</h5>
              <p className="text-muted">{freelancer.email}</p>
            </div>
            <hr />
            <p>
              <strong>Skills:</strong> {freelancer.skills.join(", ")}
            </p>
            <p>
              <strong>Experience:</strong> {freelancer.experience}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {freelancer.rating} / 5
            </p>
            <p>
              <strong>Total Earnings:</strong> {freelancer.totalEarnings}
            </p>
          </div>
        </div>

        {/* Right Section: Jobs and Notifications */}
        <div className="col-md-8">
          <div className="card p-3 shadow mb-4">
            <h5>Current Jobs</h5>
            <ul className="list-group">
              {currentJobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  {job.title}{" "}
                  <span className="text-muted">(Deadline: {job.deadline})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-3 shadow mb-4">
            <h5>Completed Jobs</h5>
            <ul className="list-group">
              {completedJobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  {job.title}{" "}
                  <span className="text-success">(Earned: {job.earnings})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-3 shadow">
            <h5>Notifications</h5>
            <ul className="list-group">
              <li className="list-group-item">New job invitation received</li>
              <li className="list-group-item">
                Payment for "Blog Website" received
              </li>
              <li className="list-group-item">Client left a 5-star review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;