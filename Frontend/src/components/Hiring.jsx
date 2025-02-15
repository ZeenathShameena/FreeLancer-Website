import { useState } from "react";
import "././styles/hiring.css"; // Import the CSS file

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
    alert("Job posted successfully!");

    // Reset form fields after submission
    setFormData({
      title: "",
      description: "",
      salary: "",
      workType: "",
      dateTime: "",
    });
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
        {["Remote", "Onsite", "Hybrid"].map((type) => (
          <div key={type} className="form-check">
            <input
              type="radio"
              id={type}
              className="form-check-input"
              name="workType"
              value={type}
              checked={formData.workType === type}
              onChange={(e) =>
                setFormData({ ...formData, workType: e.target.value })
              }
              required
            />
            <label htmlFor={type} className="form-check-label">
              {type}
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
