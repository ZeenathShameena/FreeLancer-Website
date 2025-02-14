import React from "react";
import "./styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="position-relative text-white">
        {/* Background Image */}
        <img
          src="./assets/pic02.jpg"
          alt="Background"
          className="img-fluid w-100 vh-100 object-fit-cover position-absolute top-0 start-0"
        />

        {/* Content */}
        <div className="container position-relative z-3 d-flex align-items-center vh-100 pt-5">
          <div className="row">
            {/* Text Content */}
            <div className="col-md-6 col-10 bg-dark bg-opacity-50 p-4 rounded home-text-con">
              <p className="fs-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
                harum doloribus, minima sequi porro totam reprehenderit nostrum
                saepe quibusdam laborum nihil eius a repudiandae delectus ipsum
                fuga mollitia accusamus corrupti!
              </p>
              <div className="p-3 m-3">
                <button className="btn btn-success p-3 m-3 hireme-btn">
                  <Link to="/hiring" className="freelancer-btn">
                    Freelancer
                  </Link>
                </button>
                <button className="btn btn-primary p-3 m-3 hireme-btn">
                  <Link to="/client" className="freelancer-btn">
                    Client
                  </Link>
                </button>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="col-md-6 col-10 mt-3 mt-md-0 d-flex justify-content-center ">
              <img
                src="./assets/pic04.jpg"
                alt="Right Side"
                className="img-fluid rounded home-img-con"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
