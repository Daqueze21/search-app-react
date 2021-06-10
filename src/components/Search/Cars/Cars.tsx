import React from 'react';
import styles from './Cars.module.scss';

export default function Cars() {
  return (
    <div className={styles.Cars}>
      Cars
      <input id="date" type="date" min="2020-01-01" max="2020-12-31" />
      <input id="date" type="date" min="2020-02-01" max="2020-12-31" />
    </div>
  );
}
