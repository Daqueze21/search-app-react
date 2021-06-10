import React from 'react';
import styles from './Flights.module.scss';

export default function Flights() {
  return (
    <div className={styles.Flights}>
      Flights
      <input id="date" type="date" min="2020-01-01" max="2020-12-31" />
      <input id="date" type="date" min="2020-02-01" max="2020-12-31" />
    </div>
  );
}
