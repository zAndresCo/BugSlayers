import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-3 mb-0">
          <div className="brand-icon d-flex align-items-center justify-content-center">
            <FaShieldAlt />
          </div>
          <div className="brand-text">
            <div className="logo-text">SecureTech</div>
            <div className="logo-sub">CIBERSEGURIDAD</div>
          </div>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/login" className="btn btn-outline-primary px-4">Login</Link>
          <Link to="/signup" className="btn btn-primary px-4">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
