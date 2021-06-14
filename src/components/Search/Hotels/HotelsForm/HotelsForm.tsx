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
import {
  getCountriesList,
  getCitiesToList,
  getHotelsFormData,
  getHotelsList,
} from '../../../../store/reducers/Search_Slice';
import { RootState } from '../../../../store/reducers/store';
import styles from '../../SearchForm.module.scss';

export default function HotelsForm() {
  // local form data
  const [amenities, setAmenities] = useState<string>('');
  const [hotelsCity, setHotelsCity] = useState<string>('');
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
  const onSubmitFormHandler = (data: THotelsFormData) => {
    dispatch(getHotelsFormData(JSON.stringify(data)));
    dispatch(getHotelsList(data.amenities));
    const updateData = { ...data, type: 'Hotels', id: uuid() };
    localStorageUpdateHistory(updateData);
  };

  // handlers
  const setCountryToHandler = (e: any) => {
    dispatch(getCitiesToList(e.target.value));
  };
  const setDateHandler = (e: any) => {
    setDateFrom(e.target.value);
  };
  const setAmenitiesHandler = (e: any) => {
    setAmenities(e.target.value);
  };
  const setHotelsCityHandler = (e: any) => {
    setHotelsCity(e.target.value);
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
        <h4>Amenities</h4>
        <div className={styles.SearchFormSelectors}>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
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
              {errors.country?.type === 'required' && <p>field is required</p>}
            </div>
          </div>
          <div className={styles.SearchFormSelectorWrapper}>
            <div className={styles.SearchFormSelector}>
              <label>City:</label>
              <select
                {...register('city', { required: true })}
                value={hotelsCity}
                onChange={setHotelsCityHandler}
              >
                {citiesToOptions}
              </select>
              {errors.city?.type === 'required' && <p>field is required</p>}
            </div>
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
              amenities: '',
            })
          }
        />
        <input className={styles.searchBtn} type="submit" value="Search" />
      </div>
      {/* controlBtns-end */}
    </form>
  );
}
