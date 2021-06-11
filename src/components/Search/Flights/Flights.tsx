/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './Flights.module.scss';
import FlightsForm from './FlightsForm/FlightsForm';

export default function Flights() {
  return (
    <div className={styles.Flights}>
      <h2>Flights</h2>
      <FlightsForm />
      <div className={styles.FlightsList}>Flights list</div>
    </div>
  );
}
