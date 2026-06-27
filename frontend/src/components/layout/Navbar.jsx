import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo3 from '../../assets/images/Logo3.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo3} alt="SecureTech" className="navbar-logo" />
        <div className="navbar-brand-text">
          <span className="brand-title">Secure<span>Tech</span></span>
          <span className="brand-subtitle">CIBERSEGURIDAD</span>
        </div>
      </Link>

      <div className="navbar-actions">
        <Link to="/login" className="btn-outline">Login</Link>
        <Link to="/signup" className="btn-solid">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
