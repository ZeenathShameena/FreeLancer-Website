import React, { useState } from "react";
import "./styles/hiring.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 



const Hiring = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    jobCategory: "",
    salary: "" ,
    location: "",
    workType: "",
    companyName: "",
    email: "",
    jobFile: "",
    dateTime: "",
  });
  const handleChange = (e) => {
     if (e.target.name === "jobFile") {
     setFormData({ ...formData, jobFile: e.target.files[0] }); // Store file object
     } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

     const formDataToSend = new FormData();
     Object.keys(formData).forEach((key) => {
       formDataToSend.append(key, formData[key]);
     });
    console.log("Submitting Data:", formDataToSend);
  
    try {
        await axios.post("http://localhost:4500/api/auth/submit",formData, {headers: { "Content-Type": "multipart/form-data" },})
        .then(res => {
          if (res.data.success){
            alert("Your Post Submitted Succesfully!");
            navigate("/clientdashboard");

          }
        })
        .catch(error => {
          if (error.response && error.response.status === 500) {
            alert(error.response.data.message); 
          } else {
            alert("An error occurred. Please try again.");
          }
          console.log(error);
        });
    } catch (e) {
        console.log(e);
    }
  }


  return (
    <>
      <div className="container m-5">
        <div className="row">
          <div className="col-md-12">
            <form action="" className="needs-validation" onSubmit={handleSubmit} >
              {/* Title */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control form-control-lg"
                  value={formData.title} onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Description here....."
                  value={formData.description} onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Requirement */}
              <div className="mb-3">
                <label htmlFor="requirement" className="form-label">
                  Requirement
                </label>
                <textarea
                  className="form-control"
                  id="requirement"
                  name="requirements"
                  rows="3"
                  placeholder="Requirement here....."
                  value={formData.requirements} onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Job Category */}
              <div className="mb-3">
                <label htmlFor="jobCategory" className="form-label">
                  Job Category
                </label>
                <select className="form-select" id="jobCategory" 
                      name="jobCategory" 
                      value={formData.jobCategory} onChange={handleChange}  
                      required>
                  <option value="">Select a category</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              {/* Salary Range */}
              <div className="mb-3">
                <label htmlFor="salary" className="form-label">
                  Salary Range (in USD)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  name="salary" 
                  value={formData.salary} onChange={handleChange}
                  min="1000"
                  step="500"
                  placeholder="Enter salary"
                  required
                />
              </div>

              {/* Job Location */}
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Job Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location" 
                  placeholder="Enter job location"
                  value={formData.location} onChange={handleChange}
                  required
                />
              </div>

              {/* Work Type */}
              <div className="mb-3">
                <label className="form-label">Work Type</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="workType"
                    id="remote"
                    value="remote"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="remote">
                    Remote
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="workType"
                    id="onsite"
                    value="onsite"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="onsite">
                    On-site
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="workType"
                    id="hybrid"
                    value="hybrid"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="hybrid">
                    Hybrid
                  </label>
                </div>
              </div>

              {/* Company Name */}
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName" 
                  placeholder="Enter company name"
                  value={formData.companyName} onChange={handleChange}
                  required
                />
              </div>

              {/* Contact Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter contact email"
                  value={formData.email} onChange={handleChange}
                  required
                />
              </div>

              {/* Upload Job Description File */}
              <div className="mb-3">
                <label htmlFor="jobFile" className="form-label">
                  Upload Job Description
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="jobFile"
                  name="jobFile" onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* Choose a Time */}
              <div className="mb-3">
                <label htmlFor="dateTime" className="form-label">
                  Choose a time:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dateTime"
                  name="dateTime" 
                  value={formData.dateTime} onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="hiring-btn m-5 text-center">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hiring;
