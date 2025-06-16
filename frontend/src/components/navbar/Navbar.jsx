import React, { useState } from 'react';
import './Navbar.css'; // Include a CSS file for styling

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">MyWebsite</a>
      </div>
      <div className={`menu ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/colorfill">ColorFill</a></li>
          <li><a href="/todo">ToDo</a></li>
          {/* <li><a href="/contact">Contact</a></li> */}
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
