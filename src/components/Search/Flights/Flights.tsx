/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './Flights.module.scss';
import FlightsForm from './FlightsForm/FlightsForm';
import FlightsList from './FlightsList/FlightsList';

export default function Flights() {
  return (
    <div className={styles.Flights}>
      <h2>Flights</h2>
      <FlightsForm />
      <FlightsList />
    </div>
  );
}
