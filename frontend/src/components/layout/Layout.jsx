import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';   // opcional

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;