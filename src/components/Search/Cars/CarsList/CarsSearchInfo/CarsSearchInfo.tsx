import React from 'react';
import moment from 'moment';
import styles from '../CarsList.module.scss';
import { TCarsFormData } from '../../../../utils';

interface CarsSearchInfoProps {
  carsFormData: TCarsFormData;
}
const CarsSearchInfo: React.FC<CarsSearchInfoProps> = ({ carsFormData }) => {
  const { carsType, city, country, dateFrom, dateTo } = carsFormData;
  return (
    <div className={styles.CarsSearchInfo}>
      <div className={styles.SearchInfo}>
        Pick-up: {moment(dateFrom, 'YYYY-MM-DD').format('MMM Do YYYY')}
      </div>
      <div className={styles.SearchInfo}>
        {city}, {country}, Type: {carsType}
      </div>
      <div className={styles.SearchInfo}>
        Return: {moment(dateTo, 'YYYY-MM-DD').format('MMM Do YYYY')}
      </div>
    </div>
  );
};

export default CarsSearchInfo;
