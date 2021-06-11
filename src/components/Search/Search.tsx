import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cars from './Cars/Cars';
import Flights from './Flights/Flights';
import Hotels from './Hotels/Hotels';

import Navbar from './Navbar/Navbar';
import styles from './Search.module.scss';

const Search = () => {
  return (
    <div className={styles.SearchWrapper}>
      <Navbar />
      <Switch>
        <Route path="/Search/Flights">
          <Flights />
        </Route>
        <Route path="/Search/Hotels">
          <Hotels />
        </Route>
        <Route path="/Search/Cars">
          <Cars />
        </Route>
      </Switch>
    </div>
  );
};

export default Search;
