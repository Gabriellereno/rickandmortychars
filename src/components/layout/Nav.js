import React from 'react';
import { Link } from 'react-router-dom';
import style from './nav.module.css';

const Nav = () => {
  return (
    <div className={style.menu}>
      <span>
        <h1>RICK and MORTY</h1>
        Characters
      </span>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <b>Home</b>
            </Link>
          </li>
          <li>
            <Link to="/Favorites">
              <b>Favorite List</b>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
