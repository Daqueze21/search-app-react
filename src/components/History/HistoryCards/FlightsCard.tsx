import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import styles from '../History.module.scss';
import FlightsImg from '../../../assets/images/Flights.svg';
import { IFlightsHistoryData } from '../../utils';

interface FlightsCardFormProps {
  data: IFlightsHistoryData;
  removeHistoryItem: (id: string) => void;
  id: string;
}
const FlightsCard: React.FC<FlightsCardFormProps> = ({ data, removeHistoryItem, id }) => {
  const { dateFrom, dateTo, cityFrom, cityTo } = data;
  return (
    <div className={styles.HistoryCard}>
      <div className={styles.CardIcon}>
        <img className={styles.Icon} src={FlightsImg} alt="Flight" />
      </div>
      <NavLink to="/Search/Flights">
        {moment(dateFrom, 'YYYY-MM-DD').format('MMM Do YYYY')}-
        {moment(dateTo, 'YYYY-MM-DD').format('MMM Do YYYY')}, {cityFrom}&#x2192;
        {cityTo}
      </NavLink>
      <div className={styles.DeleteBtn}>
        <button type="button" onClick={() => removeHistoryItem(id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default FlightsCard;
