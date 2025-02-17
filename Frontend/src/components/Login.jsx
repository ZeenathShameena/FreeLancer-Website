import React, { useState }  from "react";
import './styles/login.css';
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
        await axios.post("http://localhost:4500/api/auth/Login", formData, {withCredentials:true})
        .then(res => {
            if (res.data.success) {
              //localStorage.setItem("userId", res.data.user._id);
              console.log("seccess")
              localStorage.setItem("token", res.data.token);// Token is available in the `data` field
              console.log("Token in Local Storage:", localStorage.getItem("token"));

              if(res.data.message === 'Freelancer'){
                  navigate("/freelancerdashboard", {state: {id:localStorage.getItem("token")}} );
              }else{
                navigate("/clientdashboard", {state: {id:localStorage.getItem("token")}});
              }
            }
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            alert(error.response.data.message);
            navigate("/RegisterForm");
          }else if(error.response && error.response.status === 402){
              alert(error.response.data.message);
          }else {
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
                          Login into your account
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
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password" value={formData.password}
                            id="password"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            placeholder="Enter a pass"
                            required
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit">
                            Login
                          </button>
                        </div>
                      </form>

                      <a className="small text-muted" href="#!">
                        <Link to="/ForgetPassword">Forgot password? </Link>
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="#!" style={{ color: "#393f81" }}>
                          <Link to="/RegisterForm">Register here</Link>
                        </a>
                      </p>
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

export default Login;