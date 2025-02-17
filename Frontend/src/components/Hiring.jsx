import { useState } from "react";
import "././styles/hiring.css"; // Import the CSS file
import axios from "axios";



const HiringForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    workType: "",
    dateTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
       axios.post("http://localhost:4500/api/auth/submit", formData, { withCredentials: true })
      .then(res => {
        if (res.data.success){
          alert("Your Post Submitted Succesfully!");
          // Reset form fields after submission
          setFormData({
            title: "",
            description: "",
            salary: "",
            workType: "",
            dateTime: "",
          });
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

    
  };

  return (
    <form onSubmit={handleSubmit} className="animated-form">
      <h2 className="form-title">Post a Job</h2>

      <div className="mb-3 fade-in">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control animated-input"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-3 fade-in">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control animated-input"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3 fade-in">
        <label htmlFor="salary">Salary (USD)</label>
        <input
          type="number"
          id="salary"
          className="form-control animated-input"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
        />
      </div>

      <div className="mb-3 fade-in">
        <label>Work Type</label>
        {["Remote", "Onsite", "Hybrid"].map((role) => (
          <div key={role} className="form-check">
            <input
              type="radio"
              id={role}
              className="form-check-input"
              name="workType"
              value={role}
              checked={formData.workType === role}
              onChange={(e) =>
                setFormData({ ...formData, workType: e.target.value })
              }
              required
            />
            <label htmlFor={role} className="form-check-label">
              {role}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-3 fade-in">
        <label htmlFor="dateTime">Date</label>
        <input
          type="datetime-local"
          id="dateTime"
          className="form-control animated-input"
          value={formData.dateTime}
          onChange={(e) =>
            setFormData({ ...formData, dateTime: e.target.value })
          }
          required
        />
      </div>

      <button type="submit" className="btn animated-button">
        Submit
      </button>
    </form>
  );
};

export default HiringForm;
