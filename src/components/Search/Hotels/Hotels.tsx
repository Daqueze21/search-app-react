import React from 'react';
import HotelsForm from './HotelsForm/HotelsForm';
import styles from './Hotels.module.scss';
import HotelsList from './HotelsList/HotelsList';

export default function Hotels() {
  return (
    <div className={styles.Hotels}>
      <h2>Hotels</h2>
      <HotelsForm />
      <HotelsList />
    </div>
  );
}
