import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.item}`}>
        <NavLink to="/search/flights" activeClassName={styles.active}>
          Flights
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/search/hotels" activeClassName={styles.active}>
          Hotels
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/search/cars" activeClassName={styles.active}>
          Cars
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
