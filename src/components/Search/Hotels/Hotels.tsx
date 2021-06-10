import React from 'react';
import styles from './Hotels.module.scss';

export default function Hotels() {
  return (
    <div className={styles.Hotels}>
      Hotels
      <input id="date" type="date" min="2020-01-01" max="2020-12-31" />
      <input id="date" type="date" min="2020-02-01" max="2020-12-31" />
    </div>
  );
}
