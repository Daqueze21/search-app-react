import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import styles from '../History.module.scss';
import HotelsImg from '../../../assets/images/Hotels.svg';
import { IHotelsHistoryData } from '../../utils';

const stars: any = {
  '1': <span>★</span>,
  '2': <span>★★</span>,
  '3': <span>★★★</span>,
  '4': <span>★★★★</span>,
  '5': <span>★★★★★</span>,
};

interface HotelCardFormProps {
  data: IHotelsHistoryData;
  removeHistoryItem: (id: string) => void;
  id: string;
}
const FlightsCard: React.FC<HotelCardFormProps> = ({ data, removeHistoryItem, id }) => {
  const { dateFrom, dateTo, city, amenities = '5' } = data;

  return (
    <div className={styles.HistoryCard}>
      <div className={styles.CardIcon}>
        <img className={styles.Icon} src={HotelsImg} alt="Hotel" />
      </div>
      <NavLink to="/Search/Hotels">
        {moment(dateFrom, 'YYYY-MM-DD').format('MMM Do YYYY')}-
        {moment(dateTo, 'YYYY-MM-DD').format('MMM Do YYYY')}, {city}, {stars[amenities]}
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
