import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/store';
// import FlightsListCard from './FlightsListCard/FlighsListCard';
import styles from './FlightsList.module.scss';
import { TFlight } from '../../../utils';
import FlightsListCard from './FlightsListCard/FlightsListCard';

const FlightsList = () => {
  const { flightsList } = useSelector((state: RootState) => state.Search);
  const { flightsFormData } = useSelector((state: RootState) => state.Search);

  // console.log(flightsList, flightsFormData);

  return (
    <div className={styles.FlightsListWrapper}>
      {flightsList && flightsList.length ? (
        flightsList.map((flight: TFlight) => (
          <FlightsListCard
            key={flight.depart.id}
            flightData={flight}
            flightFormData={JSON.parse(flightsFormData)}
          />
        ))
      ) : (
        <div className={styles.FlightsSearchInfo}>No data</div>
      )}
    </div>
  );
};

export default FlightsList;
