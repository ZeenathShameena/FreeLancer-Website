import React from "react";

const About = () => {
  return (
    <>
      <section className="py-5 bg-light">
        <div className="container">
          {/* Header Section */}
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <h2 className="fw-bold">About Our Freelancing Platform</h2>
              <p className="lead">
                Our platform connects freelancers with businesses worldwide. We
                provide a seamless way for skilled professionals to find work
                and for businesses to hire top talent.
              </p>
              <p>
                Whether you're a developer, designer, writer, or marketer, our
                platform offers the perfect opportunity to showcase your skills
                and grow your career.
              </p>
              <a href="#" className="btn btn-primary">
                Learn More
              </a>
            </div>
            <div className="col-lg-6">
              <img
                src="/assets/image.png"
                className="img-fluid rounded"
                alt="Freelancing"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="row text-center mb-5">
            <div className="col-md-4">
              <i className="bi bi-briefcase-fill fs-1 text-primary"></i>
              <h4 className="fw-bold mt-3">Wide Job Categories</h4>
              <p>Find jobs in design, development, writing, and more.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-wallet2 fs-1 text-success"></i>
              <h4 className="fw-bold mt-3">Secure Payments</h4>
              <p>Get paid on time through our secure system.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-star-fill fs-1 text-warning"></i>
              <h4 className="fw-bold mt-3">Top Rated Freelancers</h4>
              <p>Work with highly skilled and verified professionals.</p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="row bg-white p-4 shadow rounded">
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p className="mb-3">
                  "This platform helped me get my first client! Now, I work
                  full-time as a freelancer."
                </p>
                <footer className="blockquote-footer">
                  Vijay , Web Developer
                </footer>
              </blockquote>
            </div>
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p className="mb-3">
                  "Hiring on this platform was quick and easy. Found an amazing
                  designer for my startup!"
                </p>
                <footer className="blockquote-footer">
                  Ajitha, Startup Founder
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
