import React from 'react';
import styles from './HotelsListCard.module.scss';
import HotelIcon from '../../../../../assets/images/Hotel.svg';
import PersonIcon from '../../../../../assets/images/Person.svg';
import ParkingIcon from '../../../../../assets/images/Parking.svg';
import WifiIcon from '../../../../../assets/images/Wifi.svg';
import { THotel } from '../../../../utils';

interface HotelListCardProps {
  hotelData: THotel;
  city: string;
}

const HotelsListCard: React.FC<HotelListCardProps> = ({ hotelData, city }) => {
  const { Hotel, Street, Guests, Price, Amenities } = hotelData;
  return (
    <div className={styles.HotelsListCard}>
      <div className={styles.HotelHeader}>
        <img className={styles.HotelIcon} src={HotelIcon} alt="Car" />
        <h3 className={styles.HotelName}>{Hotel}</h3>
        <div className={styles.HotelAmenities}>&#x2605; {Amenities}</div>
      </div>
      <div className={styles.HotelSubstring}>
        street: {Street}, {city}
      </div>
      <div className={styles.HotelInfoWrapper}>
        <div className={styles.HotelInfo}>
          <div className={styles.HotelService}>
            <img className={styles.HotelServiceImg} src={WifiIcon} alt="Wifi" />
            <span>Internet access</span>
          </div>
          <div className={styles.HotelService}>
            <img className={styles.HotelServiceImg} src={ParkingIcon} alt="Parking" />
            <span>Parking available</span>
          </div>
          <div className={styles.HotelService}>
            <img className={styles.HotelServiceImg} src={PersonIcon} alt="person" />
            <span>{Guests}</span>
          </div>
          <div className={styles.HotelService}>
            <span>FREE cancellation • No prepayment needed</span>
          </div>
          <div className={styles.HotelService}>
            <span>Only 6 rooms left at this price on our site</span>
          </div>
        </div>
        <div className={styles.HotelPricing}>
          <strong className={styles.HotelPrice}>{Price}</strong>
          <input className={styles.DealBtn} type="button" value="BOOK NOW" />
        </div>
      </div>
    </div>
  );
};

export default HotelsListCard;
