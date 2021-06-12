/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid-random';

import { TCarsFormData, localStorageUpdateHistory, dateNow, dateNowPlusYear } from '../../../utils';
import { getCountriesList, getCitiesToList } from '../../../../store/reducers/Search_Slice';
import { RootState } from '../../../../store/reducers/store';
import styles from '../../SearchForm.module.scss';

export default function CarsForm() {
  // local form data
  const [carsType, setCarsType] = useState<string>('');
  const [carsCity, setCarsCity] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  // data from store
  const dispatch = useDispatch();
  const { countriesList } = useSelector((state: RootState) => state.Search);
  const { citiesToList } = useSelector((state: RootState) => state.Search);
  const { countryTo } = useSelector((state: RootState) => state.Search);
  const getCountries = useCallback(() => dispatch(getCountriesList()), [dispatch]);
  useEffect(() => {
    getCountries();
  }, [getCountries]);

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // form handler
  const onSubmitToHandler = (data: TCarsFormData) => {
    const updateData = { ...data, type: 'Cars', id: uuid() };
    localStorageUpdateHistory(updateData);
  };

  // handlers
  const setCountryToHandler = (e: any) => {
    dispatch(getCitiesToList(e.target.value));
  };
  const setDateHandler = (e: any) => {
    setDateFrom(e.target.value);
  };
  const setCarsTypeHandler = (e: any) => {
    setCarsType(e.target.value);
  };
  const setCarsCityHandler = (e: any) => {
    setCarsCity(e.target.value);
  };

  const countriesOptions: JSX.Element[] = countriesList.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ));

  const citiesToOptions: JSX.Element[] = citiesToList.map((city) => (
    <option key={uuid()} value={city}>
      {city}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmitToHandler)} className={styles.SearchForm}>
      <div className={styles.dates}>
        <div className={styles.date}>
          <label>Start Date</label>
          <input
            {...register('dateFrom', { required: true, min: dateNow })}
            type="date"
            min={dateNow}
            max={dateNowPlusYear}
            onChange={setDateHandler}
          />
          {errors.dateFrom?.type === 'required' && <p>date is required</p>}
          {errors.dateFrom?.type === 'min' && <p>cant be less than the current date</p>}
        </div>
        <div className={styles.date}>
          <label>End Date</label>
          <input
            {...register('dateTo', { required: true, min: dateFrom })}
            type="date"
            min={dateFrom}
            max={dateNowPlusYear}
          />
          {errors.dateTo?.type === 'required' && <p>date is required</p>}
          {errors.dateTo?.type === 'min' && <p>no less than the start date</p>}
        </div>
      </div>
      {/* dates-end */}
      <div className={styles.SearchFormSelectorsWrapper}>
        <h4>Type</h4>
        <div className={styles.SearchFormSelectors}>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <select
                {...register('carsType', { required: true })}
                value={carsType}
                onChange={setCarsTypeHandler}
              >
                <option value="economy">economy</option>
                <option value="business">business</option>
              </select>
            </div>
            {errors.carsType?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* SearchFormSelectorsWrapper-end */}
      <div className={styles.SearchFormSelectorsWrapper}>
        <h4>Location</h4>
        <div className={styles.SearchFormSelectors}>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>Country:</label>
              <select
                {...register('country', { required: true })}
                value={countryTo}
                onChange={setCountryToHandler}
              >
                {countriesOptions}
              </select>
            </div>
            {errors.country?.type === 'required' && <p>field is required</p>}
          </div>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>City:</label>
              <select
                {...register('city', { required: true })}
                value={carsCity}
                onChange={setCarsCityHandler}
              >
                {citiesToOptions}
              </select>
            </div>
            {errors.city?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* SearchFormSelectorsWrapper-end */}
      <div className={styles.controlBtns}>
        <input
          className={styles.clearBtn}
          type="button"
          value="Clear"
          onClick={() =>
            reset({
              dateFrom: '',
              dateTo: '',
              country: '',
              city: '',
              carsType: '',
            })
          }
        />
        <input className={styles.searchBtn} type="submit" value="Search" />
      </div>
      {/* controlBtns-end */}
    </form>
  );
}
