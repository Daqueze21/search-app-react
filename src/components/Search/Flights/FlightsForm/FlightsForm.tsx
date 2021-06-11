/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid-random';

import {
  TFlightsFormData,
  localStorageUpdateHistory,
  dateNow,
  dateNowPlusYear,
} from '../../../utils';
import {
  getCountriesList,
  getCitiesFromList,
  getCitiesToList,
} from '../../../../store/reducers/Search_Slice';
import { RootState } from '../../../../store/reducers/store';
import styles from './FlightsForm.module.scss';

export default function FlightsForm() {
  // local form data
  const [countryFrom, setCountryFrom] = useState<string>('');
  const [countryTo, setCountryTo] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  // data from store
  const dispatch = useDispatch();
  const { countriesList } = useSelector((state: RootState) => state.Search);
  const { citiesFromList } = useSelector((state: RootState) => state.Search);
  const { citiesToList } = useSelector((state: RootState) => state.Search);
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
  const onSubmitFormHandler = (data: TFlightsFormData) => {
    const updateData = [{ ...data, type: 'Flights', id: uuid() }];
    localStorageUpdateHistory(updateData);
  };

  // handlers
  const setCountryFromHandler = (e: any) => {
    setCountryFrom(e.target.value);
    dispatch(getCitiesFromList(e.target.value));
  };
  const setCountryToHandler = (e: any) => {
    setCountryTo(e.target.value);
    dispatch(getCitiesToList(e.target.value));
  };
  const setDateHandler = (e: any) => {
    setDateFrom(e.target.value);
  };

  const countriesOptions: JSX.Element[] = countriesList.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ));
  const citiesFromOptions: JSX.Element[] = citiesFromList.map((city) => (
    <option key={uuid()} value={city}>
      {city}
    </option>
  ));
  const citiesToOptions: JSX.Element[] = citiesToList.map((city) => (
    <option key={uuid()} value={city}>
      {city}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmitFormHandler)}>
      <div className={styles.dates}>
        <div className={styles.datesFrom}>
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
        <div className={styles.datesTo}>
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
      <div className={styles.FlightsSelectorsWrapper}>
        <h4>From</h4>
        <div className={styles.FlightsSelectors}>
          <div className={styles.FlightsSelectorWrapper}>
            <div className={styles.FlightsSelector}>
              <label>Country:</label>
              <select
                {...register('countryFrom', { required: true })}
                onChange={setCountryFromHandler}
              >
                {countriesOptions}
              </select>
            </div>
            {errors.countryFrom?.type === 'required' && <p>field is required</p>}
          </div>
          <div className={styles.FlightsSelectorWrapper}>
            <div className={styles.FlightsSelector}>
              <label>City:</label>
              <select {...register('cityFrom', { required: true })}>{citiesFromOptions}</select>
            </div>
            {errors.cityFrom?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* FlightsSelectorsWrapper-end */}
      <div className={styles.FlightsSelectorsWrapper}>
        <h4>To</h4>
        <div className={styles.FlightsSelectors}>
          <div className={styles.FlightsSelectorWrapper}>
            <div className={styles.FlightsSelector}>
              <label>Country:</label>
              <select {...register('countryTo', { required: true })} onChange={setCountryToHandler}>
                {countriesOptions}
              </select>
            </div>
            {errors.countryTo?.type === 'required' && <p>field is required</p>}
          </div>
          <div className={styles.FlightsSelectorWrapper}>
            <div className={styles.FlightsSelector}>
              <label>City:</label>
              <select {...register('cityTo', { required: true })}>{citiesToOptions}</select>
            </div>
            {errors.cityTo?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* FlightsSelectorsWrapper-end */}
      <div className={styles.controlBtns}>
        <input
          className={styles.clearBtn}
          type="button"
          value="Clear"
          onClick={() =>
            reset({
              dateFrom: '',
              dateTo: '',
              countryFrom: '',
              cityFrom: '',
              cityTo: '',
              countryTo: '',
            })
          }
        />
        <input className={styles.searchBtn} type="submit" value="Search" />
      </div>
      {/* controlBtns-end */}
    </form>
  );
}
