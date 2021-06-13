import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/store';
import CarsListCard from './CarsListCard/CarsListCard';
import CarsSearchInfo from './CarsSearchInfo/CarsSearchInfo';
import styles from './CarsList.module.scss';
import { TCar } from '../../../utils';

const CarsList = () => {
  const { carsList } = useSelector((state: RootState) => state.Search);
  const { carsFormData } = useSelector((state: RootState) => state.Search);

  const carCardRender = (car: TCar) => {
    return <CarsListCard key={car.id} data={car} />;
  };

  return (
    <div className={styles.CarsListWrapper}>
      {carsFormData ? (
        <CarsSearchInfo carsFormData={JSON.parse(carsFormData)} />
      ) : (
        <div className={styles.CarsSearchInfo}>No data</div>
      )}
      {carsList && carsList.length ? (
        <div className={styles.CarsList}>{carsList.map((car: TCar) => carCardRender(car))}</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CarsList;
