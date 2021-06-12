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
import styles from '../../SearchForm.module.scss';

export default function FlightsForm() {
  // local form data
  const [dateFrom, setDateFrom] = useState<string>('');
  const [cityFrom, setCityFrom] = useState<string>('');
  const [cityTo, setCityTo] = useState<string>('');
  // data from store
  const dispatch = useDispatch();
  const { countriesList } = useSelector((state: RootState) => state.Search);
  const { citiesFromList } = useSelector((state: RootState) => state.Search);
  const { citiesToList } = useSelector((state: RootState) => state.Search);
  const { countryFrom } = useSelector((state: RootState) => state.Search);
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
  const onSubmitFormHandler = (data: TFlightsFormData) => {
    const updateData = { ...data, type: 'Flights', id: uuid() };
    localStorageUpdateHistory(updateData);
  };

  // handlers
  const setDateHandler = (e: any) => {
    setDateFrom(e.target.value);
  };
  const setCountryFromHandler = (e: any) => {
    setCityFrom('');
    dispatch(getCitiesFromList(e.target.value));
  };
  const setCountryToHandler = (e: any) => {
    setCityTo('');
    dispatch(getCitiesToList(e.target.value));
  };
  const setCityFromHandler = (e: any) => {
    setCityFrom(e.target.value);
  };
  const setCityToHandler = (e: any) => {
    setCityTo(e.target.value);
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
    <form onSubmit={handleSubmit(onSubmitFormHandler)} className={styles.SearchForm}>
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
        <h4>From</h4>
        <div className={styles.SearchFormSelectors}>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>Country:</label>
              <select
                {...register('countryFrom', { required: true })}
                value={countryFrom}
                onChange={setCountryFromHandler}
              >
                {countriesOptions}
              </select>
            </div>
            {errors.countryFrom?.type === 'required' && <p>field is required</p>}
          </div>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>City:</label>
              <select
                {...register('cityFrom', { required: true })}
                onChange={setCityFromHandler}
                value={cityFrom}
              >
                {citiesFromOptions}
              </select>
            </div>
            {errors.cityFrom?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* SearchFormSelectorsWrapper-end */}
      <div className={styles.SearchFormSelectorsWrapper}>
        <h4>To</h4>
        <div className={styles.SearchFormSelectors}>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>Country:</label>
              <select
                {...register('countryTo', { required: true })}
                value={countryTo}
                onChange={setCountryToHandler}
              >
                {countriesOptions}
              </select>
            </div>
            {errors.countryTo?.type === 'required' && <p>field is required</p>}
          </div>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>City:</label>
              <select
                {...register('cityTo', { required: true })}
                onChange={setCityToHandler}
                value={cityTo}
              >
                {citiesToOptions}
              </select>
            </div>
            {errors.cityTo?.type === 'required' && <p>field is required</p>}
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
