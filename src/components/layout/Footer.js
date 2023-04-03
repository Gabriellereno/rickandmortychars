import React from 'react';
import style from './footer.module.css';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.comport}>
        <div className={style.copy}>
          <h1>Rick and Morty API</h1>
          <a href="https://rickandmortyapi.com/documentation/#introduction">
            <p>Check this public API</p>
          </a>
        </div>
        <div className={style.madeBy}>
          <h2>
            Gabriel Lereno<span>React Dev</span>
          </h2>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/gabriel-zanella-lereno-490885230/">
                <p>LinkedIn</p>
              </a>
            </li>
            <li>
              <a href="https://github.com/Gabriellereno/rickandmortychars">
                <p>Github Repo</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
