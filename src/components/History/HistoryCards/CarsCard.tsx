import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import styles from '../History.module.scss';
import FlightsImg from '../../../assets/images/Cars.svg';
import { ICarsHistoryData } from '../../utils';

interface CarsCardFormProps {
  data: ICarsHistoryData;
}
const FlightsCard: React.FC<CarsCardFormProps> = ({ data }) => {
  const { dateFrom, dateTo, cityFrom, carsType } = data;
  return (
    <div className={styles.HistoryCard}>
      <div className={styles.CardIcon}>
        <img className={styles.Icon} src={FlightsImg} alt="Car" />
      </div>
      <NavLink to="/Search/Cars">
        {moment(dateFrom, 'YYYY-MM-DD').format('MMM Do YYYY')}-
        {moment(dateTo, 'YYYY-MM-DD').format('MMM Do YYYY')}, {cityFrom}, {carsType}
      </NavLink>
      <div className={styles.DeleteBtn}>
        <button type="button">X</button>
      </div>
    </div>
  );
};

export default FlightsCard;
