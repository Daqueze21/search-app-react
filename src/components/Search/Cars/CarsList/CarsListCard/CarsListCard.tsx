import React from 'react';
import styles from './CarsListCard.module.scss';
import PersonIcon from '../../../../../assets/images/Person.svg';
import ManufactureIcon from '../../../../../assets/images/Manufacturer.svg';
import ConditioningIcon from '../../../../../assets/images/Conditioning.svg';
import CarIconEconomy from '../../../../../assets/images/Cars2.svg';
import CarIconBusiness from '../../../../../assets/images/Cars.svg';
import { TCar } from '../../../../utils';

interface CarsListCardProps {
  data: TCar;
}
const CarsListCard: React.FC<CarsListCardProps> = ({ data }) => {
  const { Model, Manufacturer, Type, Year, Price, Seats } = data;
  return (
    <div className={styles.CarsListCard}>
      <div className={styles.CardHeader}>
        <div className={styles.CarName}>
          <h4>{Manufacturer}</h4>
          <h5>{Model}</h5>
        </div>
        <div className={styles.CardImg}>
          <img
            className={styles.CarIcon}
            src={Type === 'business' ? CarIconBusiness : CarIconEconomy}
            alt="Car"
          />
        </div>
      </div>
      <div className={styles.CarMain}>
        <div className={styles.CarFeatures}>
          <div className={styles.CarFeature}>
            <img className={styles.CarFeatureImg} src={ConditioningIcon} alt="snowflake" />
            <span>Air Conditioning</span>
          </div>
          <div className={styles.CarFeature}>
            <img className={styles.CarFeatureImg} src={ManufactureIcon} alt="Manufacturer" />
            <span>{Year}</span>
          </div>
          <div className={styles.CarFeature}>
            <img className={styles.CarFeatureImg} src={PersonIcon} alt="person" />
            <span>{Seats}</span>
          </div>
        </div>
        <div className={styles.CarPricing}>
          <strong className={styles.CarPrice}>{Price}</strong>
          <input className={styles.DealBtn} type="button" value="View deal" />
        </div>
      </div>
    </div>
  );
};

export default CarsListCard;
