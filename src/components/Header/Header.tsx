import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_Search}>
        <NavLink
          to="/search"
          activeStyle={{
            color: 'yellow',
          }}
        >
          Search
        </NavLink>
      </div>
      <div className={styles.header_SearchHistory}>
        <NavLink
          to="/history"
          activeStyle={{
            color: 'yellow',
          }}
        >
          Search History
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
