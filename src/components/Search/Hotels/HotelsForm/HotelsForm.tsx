/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid-random';

import {
  THotelsFormData,
  localStorageUpdateHistory,
  dateNow,
  dateNowPlusYear,
} from '../../../utils';
import { getCountriesList, getCitiesFromList } from '../../../../store/reducers/Search_Slice';
import { RootState } from '../../../../store/reducers/store';
import styles from './HotelsForm.module.scss';

export default function HotelsForm() {
  // local form data
  const [amenities, setAmenities] = useState<string>('');
  const [hotelCity, setHotelCity] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  // data from store
  const dispatch = useDispatch();
  const { countriesList } = useSelector((state: RootState) => state.Search);
  const { citiesFromList } = useSelector((state: RootState) => state.Search);
  // const { citiesToList } = useSelector((state: RootState) => state.Search);
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
  const onSubmitFormHandler = (data: THotelsFormData) => {
    const updateData = { ...data, type: 'Hotels', id: uuid() };
    localStorageUpdateHistory(updateData);
  };

  // handlers
  const setCountryFromHandler = (e: any) => {
    // setCountryFrom(e.target.value);
    dispatch(getCitiesFromList(e.target.value));
  };
  const setDateHandler = (e: any) => {
    setDateFrom(e.target.value);
  };
  const setAmenitiesHandler = (e: any) => {
    setAmenities(e.target.value);
  };
  const setHotelCityHandler = (e: any) => {
    setHotelCity(e.target.value);
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
      <div className={styles.HotelsSelectorsWrapper}>
        <h4>Amenities</h4>
        <div className={styles.HotelsSelectors}>
          <div className={styles.HotelsSelectorWrapper}>
            <div className={styles.HotelsSelector}>
              <select
                {...register('amenities', { required: true })}
                value={amenities}
                onChange={setAmenitiesHandler}
              >
                <option value="1">1 star </option>
                <option value="2">2 star </option>
                <option value="3">3 star </option>
                <option value="4">4 star </option>
                <option value="5">5 star </option>
              </select>
            </div>
            {errors.amenities?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* FlightsSelectorsWrapper-end */}
      <div className={styles.HotelsSelectorsWrapper}>
        <h4>To</h4>
        <div className={styles.HotelsSelectors}>
          <div className={styles.HotelsSelectorWrapper}>
            <div className={styles.HotelsSelector}>
              <label>Country:</label>
              <select {...register('country', { required: true })} onChange={setCountryFromHandler}>
                {countriesOptions}
              </select>
            </div>
            {errors.country?.type === 'required' && <p>field is required</p>}
          </div>
          <div className={styles.HotelsSelectorWrapper}>
            <div className={styles.HotelsSelector}>
              <label>City:</label>
              <select
                {...register('city', { required: true })}
                value={hotelCity}
                onChange={setHotelCityHandler}
              >
                {citiesFromOptions}
              </select>
            </div>
            {errors.city?.type === 'required' && <p>field is required</p>}
          </div>
        </div>
      </div>
      {/* HotelsSelectorsWrapper-end */}
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
              Amenities: '',
            })
          }
        />
        <input className={styles.searchBtn} type="submit" value="Search" />
      </div>
      {/* controlBtns-end */}
    </form>
  );
}
