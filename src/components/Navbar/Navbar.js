import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';

function Navbar() {
  let userId = 5;
  return (
    <div>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={{ pathname: '/users/' + userId }}>User</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
