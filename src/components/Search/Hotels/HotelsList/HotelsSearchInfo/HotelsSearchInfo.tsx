import React from 'react';
import moment from 'moment';
import styles from '../HotelsList.module.scss';
import { THotelsFormData } from '../../../../utils';

interface HotelsSearchInfoProps {
  hotelsFormData: THotelsFormData;
}
const CarsSearchInfo: React.FC<HotelsSearchInfoProps> = ({ hotelsFormData }) => {
  const { city, amenities, country, dateFrom, dateTo } = hotelsFormData;
  return (
    <div className={styles.HotelsSearchInfo}>
      <div className={styles.SearchInfo}>
        from: {moment(dateFrom, 'YYYY-MM-DD').format('MMM Do YYYY')}
      </div>
      <div className={styles.SearchInfo}>
        {city}, {country}, &#x2605; {amenities}
      </div>
      <div className={styles.SearchInfo}>
        To: {moment(dateTo, 'YYYY-MM-DD').format('MMM Do YYYY')}
      </div>
    </div>
  );
};

export default CarsSearchInfo;
