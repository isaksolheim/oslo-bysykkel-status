import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return(
      <nav>
        <Link to="/"><img src={'./images/logo.png'} alt="logo" /></Link>
        <ul className="links">
          <Link to="/stasjoner"><li>Stasjoner</li></Link>
          <Link to="/kart"><li>Kart</li></Link>
          <li id="button">Last ned</li>
        </ul>
      </nav>
    );
}

export default Navbar;