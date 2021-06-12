import React from 'react';
import CarsForm from './CarsForm/CarsForm';
import styles from './Cars.module.scss';

export default function Cars() {
  return (
    <div className={styles.Cars}>
      <h2>Cars</h2>
      <CarsForm />
      <div className={styles.HotelsList}>Cars list</div>
    </div>
  );
}
