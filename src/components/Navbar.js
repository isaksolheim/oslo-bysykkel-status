import React from 'react';

function Navbar() {
  return(
    <nav>
      <img src={'./images/logo.png'} alt="logo" />
      <ul>
        <li>Stasjoner</li>
        <li id="button">Last ned</li>
      </ul>
    </nav>
  );
}

export default Navbar;