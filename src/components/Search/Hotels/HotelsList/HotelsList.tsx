import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/store';
import styles from './HotelsList.module.scss';
import { THotel } from '../../../utils';
import HotelsSearchInfo from './HotelsSearchInfo/HotelsSearchInfo';
import HotelsListCard from './HotelsListCard/HotelsListCard';

const FlightsList = () => {
  const { hotelsList } = useSelector((state: RootState) => state.Search);
  const { hotelsFormData } = useSelector((state: RootState) => state.Search);

  return (
    <div className={styles.HotelsListWrapper}>
      {hotelsFormData ? (
        <HotelsSearchInfo hotelsFormData={JSON.parse(hotelsFormData)} />
      ) : (
        <div className={styles.HotelsSearchInfo}>No data</div>
      )}
      <div className={styles.HotelsList}>
        {hotelsList && hotelsList.length
          ? hotelsList.map((hotel: THotel) => (
              <HotelsListCard
                key={hotel.id}
                hotelData={hotel}
                city={JSON.parse(hotelsFormData).city}
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export default FlightsList;
