import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_Search}>
        <NavLink
          to="/Search"
          activeStyle={{
            color: '#F3BA00',
          }}
        >
          Search
        </NavLink>
      </div>
      <div className={styles.header_SearchHistory}>
        <NavLink
          to="/History"
          activeStyle={{
            color: '#F3BA00',
          }}
        >
          Search History
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
