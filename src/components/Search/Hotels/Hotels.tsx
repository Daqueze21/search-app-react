import React from 'react';
import HotelsForm from './HotelsForm/HotelsForm';
import styles from './Hotels.module.scss';

export default function Hotels() {
  return (
    <div className={styles.Hotels}>
      <h2>Hotels</h2>
      <HotelsForm />
      <div className={styles.HotelsList}>Flights list</div>
    </div>
  );
}
