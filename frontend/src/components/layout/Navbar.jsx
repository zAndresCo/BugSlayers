import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo3 from '../../assets/images/Logo3.jpg';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo3} alt="SecureTech" className="navbar-logo" />
        <div className="navbar-brand-text">
          <span className="brand-title">Secure<span>Tech</span></span>
          <span className="brand-subtitle">CIBERSEGURIDAD</span>
        </div>
      </Link>

      <div className="navbar-actions" ref={ref}>
        {!user ? (
          <>
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/signup" className="btn-solid">Sign Up</Link>
          </>
        ) : (
          <div className="nav-user" style={{ position: 'relative' }}>
            <button className="nav-user-btn" onClick={() => setOpen(o => !o)}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="avatar" className="nav-avatar" />
              ) : (
                <div className="nav-avatar-default" aria-hidden>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#e8f0fe" />
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="#1a56db" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#1a56db" />
                  </svg>
                </div>
              )}
              <span className="nav-user-name">{user.nombre_completo}</span>
            </button>
            {open && (
              <div className="nav-user-menu">
                <button className="nav-user-menu-item" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
