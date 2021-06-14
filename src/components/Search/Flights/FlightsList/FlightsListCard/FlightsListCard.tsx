import React from 'react';
import styles from './FlightsListCard.module.scss';
import AirlineLogo from '../../../../../assets/images/AirlineLogo.svg';
import { TFlight, TFlightsFormData } from '../../../../utils';

interface CarsListCardProps {
  flightData: TFlight;
  flightFormData: TFlightsFormData;
}

const FlightsListCard: React.FC<CarsListCardProps> = ({ flightData, flightFormData }) => {
  const { cityFrom, cityTo, dateFrom, dateTo } = flightFormData;
  return (
    <div className={styles.FlightsListCard}>
      <div className={styles.FlightHeader}>
        <img className={styles.CarIcon} src={AirlineLogo} alt="Car" />
        <h3 className={styles.FlightAirline}>{flightData.depart.Airline}</h3>
      </div>
      <div className={styles.FlightInfoWrapper}>
        <div className={styles.FlightInfo}>
          <h4 className={styles.FlightInfoTime}>{flightData.depart.DepartureTime}</h4>
          <div className={styles.FlightInfoCity}>{cityFrom}</div>
          <div className={styles.FlightDate}>{dateFrom}</div>
        </div>
        <div className={styles.FlightPrice}>{flightData.depart.Price}</div>
        <div className={styles.FlightInfo}>
          <h4 className={styles.FlightInfoTime}>{flightData.depart.ArrivalTime}</h4>
          <div className={styles.FlightInfoCity}>{cityTo}</div>
          <div className={styles.FlightDate}>{dateFrom}</div>
        </div>
      </div>
      <hr />
      <div className={styles.FlightInfoWrapper}>
        <div className={styles.FlightInfo}>
          <h4 className={styles.FlightInfoTime}>{flightData.return.DepartureTime}</h4>
          <div className={styles.FlightInfoCity}>{cityTo}</div>
          <div className={styles.FlightDate}>{dateTo}</div>
        </div>
        <div className={styles.FlightPrice}>{flightData.return.Price}</div>
        <div className={styles.FlightInfo}>
          <h4 className={styles.FlightInfoTime}>{flightData.return.ArrivalTime}</h4>
          <div className={styles.FlightInfoCity}>{cityFrom}</div>
          <div className={styles.FlightDate}>{dateTo}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightsListCard;
