import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/navbar.css";

const Navbar = () => {
  // Get current route to conditionally render navbar
  const location = useLocation();
  const hideNavbar = ["/login", "/RegisterForm","/client","/hiring"].includes(location.pathname);

  // State to handle navbar collapse
  const [isCollapsed, setIsCollapsed] = useState(true);

  // If route is in the hideNavbar array, don't render the navbar
  if (hideNavbar) return null;

  // Toggle navbar collapse
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Close navbar when a link is clicked
  const closeNavbar = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 sticky-top">
      <div className="container-fluid">
        {/* Brand Name */}
        <a className="navbar-brand text-white" href="#">
          Navbar scroll
        </a>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarScroll"
        >
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {/* Home Link */}
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            {/* About Link */}
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/about"
                onClick={closeNavbar}
              >
                About
              </Link>
            </li>
            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu">
                {/* Services Link */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/services"
                    onClick={closeNavbar}
                  >
                    Services
                  </Link>
                </li>
                {/* Contact Link */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/contact"
                    onClick={closeNavbar}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Login & Register Buttons */}
          <div className="d-flex gap-2">
            {/* Login Button */}
            <Link
              to="/login"
              className="btn btn-primary p-2 login-btn"
              onClick={closeNavbar}
            >
              Login
            </Link>
            {/* Register Button */}
            <Link
              to="/RegisterForm"
              className="btn btn-primary p-2 register-btn"
              onClick={closeNavbar}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
