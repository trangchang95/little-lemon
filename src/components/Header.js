import React from 'react';
import logo from '../assets/Logo.png';

function Header() {
  return (
    <header>
      {/* Header content goes here */}
      <img src={logo} alt="Little Lemon Logo"/>
      <p>Header content</p>
    </header>
  );
}

export default Header;