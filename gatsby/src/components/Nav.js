import React from 'react';
import { Link, navigate } from 'gatsby';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Hot now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizza menu</Link>
      </li>
      <li>
        <Link to="/">LOGO</Link>
      </li>
      <li>
        <Link to="/slicemasters">Slicemasters</Link>
      </li>
      <li>
        <Link to="/order">Order ahead!</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
