import React, { useState }  from "react";
import './styles/login.css';
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";


const PasswordValidation = () => {
  const location=useLocation()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: location.state.id,
    providedCode:'',
    newPassword:''
  });

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  async function submit(e) {
    e.preventDefault();

    try {
        await axios.patch("http://localhost:4500/api/auth/verify-forgot-password-code", formData)
        .then(res => {
            if (res.data.success) {
              alert("Password Updated");
              navigate("/Login");
            }
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            alert(error.response.data.message); 
          } else {
            alert("An error occurred. Please try again.");
          }
        });
    } catch (e) {
        console.log(e);
    }
  }
    return (
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block d-flex align-items-center text-center mb-5">
                    <img
                      src="/assets/pic04.jpg"
                      alt="login form"
                      className="img-fluid h-100"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={submit} action="postMessage" >
                        <div className="d-flex align-items-center">
                          {/* <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span> */}
                          <img
                            src="/assets/image.png"
                            alt="logo"
                            className="img-fluid logo w-50"
                          />
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                         Change Password
                        </h5>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email" value={formData.email} 
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Enter a email"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="providedCode">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            name="providedCode" value={formData.providedCode} 
                            id="providedCode"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            placeholder="Enter Code Send to Email"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="newPassword">
                            New Password
                          </label>
                          <input
                            type="text"
                            name="newPassword" value={formData.newPassword} 
                            id="newPassword"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            placeholder="Enter new Password"
                            required
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit">
                            Submit
                          </button>
                        </div>
                      </form>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default PasswordValidation;