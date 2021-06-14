import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppThunk } from '../index';
import { TCar, TFlight, THotel } from '../../components/utils';

export type TSearchState = {
  status: string;
  countriesList: string[];
  citiesFromList: string[];
  citiesToList: string[];
  countryFrom: string;
  countryTo: string;
  carsList: TCar[];
  carsFormData: string;
  flightsList: TFlight[];
  flightsFormData: string;
  hotelsList: THotel[];
  hotelsFormData: string;
};

const initialState: TSearchState = {
  status: '',
  countriesList: [],
  citiesFromList: [],
  citiesToList: [],
  countryFrom: '',
  countryTo: '',
  carsList: [],
  carsFormData: '',
  flightsList: [],
  flightsFormData: '',
  hotelsList: [],
  hotelsFormData: '',
};
// reducer
const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setCountriesList(state, action: PayloadAction<string[]>) {
      state.countriesList = action.payload;
    },
    setCitiesFromList(state, action: PayloadAction<string[]>) {
      state.citiesFromList = action.payload;
    },
    setCitiesToList(state, action: PayloadAction<string[]>) {
      state.citiesToList = action.payload;
    },
    setCountryFrom(state, action: PayloadAction<string>) {
      state.countryFrom = action.payload;
    },
    setCountryTo(state, action: PayloadAction<string>) {
      state.countryTo = action.payload;
    },
    setCarsList(state, action: PayloadAction<TCar[]>) {
      state.carsList = action.payload;
    },
    setCarsFormData(state, action: PayloadAction<string>) {
      state.carsFormData = action.payload;
    },
    setFlightsList(state, action: PayloadAction<TFlight[]>) {
      state.flightsList = action.payload;
    },
    setFlightsFormData(state, action: PayloadAction<string>) {
      state.flightsFormData = action.payload;
    },
    setHotelsList(state, action: PayloadAction<THotel[]>) {
      state.hotelsList = action.payload;
    },
    setHotelsFormData(state, action: PayloadAction<string>) {
      state.hotelsFormData = action.payload;
    },
  },
});

export const getCountriesList = (): AppThunk => async (dispatch: any) => {
  await dispatch(setStatus('Loading...'));

  axios
    .get(`/api/mock-data/countries.min.json`)
    .then((answer) => {
      const countries = Object.keys(answer.data);
      dispatch(setCountriesList(countries));
    })
    .catch((error: AxiosError) => {
      dispatch(setStatus(`Error: ${error.response}`));
    });
};

export const getCitiesFromList =
  (country: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    dispatch(setCountryFrom(country));

    axios
      .get(`/api/mock-data/countries.min.json`)
      .then((answer) => {
        const cities =
          answer.data[country].length >= 50
            ? answer.data[country].slice(0, 50)
            : answer.data[country];
        dispatch(setCitiesFromList(cities));
      })
      .catch((error: AxiosError) => {
        dispatch(setStatus(`Error: ${error.response}`));
      });
  };

export const getCitiesToList =
  (country: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    dispatch(setCountryTo(country));
    axios
      .get(`/api/mock-data/countries.min.json`)
      .then((answer) => {
        const cities =
          answer.data[country].length >= 50
            ? answer.data[country].slice(0, 50)
            : answer.data[country];
        dispatch(setCitiesToList(cities));
      })
      .catch((error: AxiosError) => {
        dispatch(setStatus(`Error: ${error.response}`));
      });
  };

export const getCarsList =
  (carsType: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    axios
      .get(`/api/mock-data/cars.json`)
      .then((answer) => {
        const filteredCarsList = answer.data.filter((car: TCar) => car.Type === carsType);
        dispatch(setCarsList(filteredCarsList));
      })
      .catch((error: AxiosError) => {
        dispatch(setStatus(`Error: ${error.response}`));
      });
  };

export const getCarsFormData =
  (CarsFormData: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    dispatch(setCarsFormData(CarsFormData));
  };

export const getFlightsList = (): AppThunk => async (dispatch: any) => {
  await dispatch(setStatus('Loading...'));
  axios
    .get(`/api/mock-data/flights.json`)
    .then((answer) => {
      dispatch(setFlightsList(answer.data));
    })
    .catch((error: AxiosError) => {
      dispatch(setStatus(`Error: ${error.response}`));
    });
};

export const getFlightsFormData =
  (FlightsFormData: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    dispatch(setFlightsFormData(FlightsFormData));
  };

export const getHotelsList =
  (amenities: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    axios
      .get(`/api/mock-data/hotels.json`)
      .then((answer) => {
        const filteredHotelsList = answer.data.filter(
          (hotel: THotel) => hotel.Amenities.toString() === amenities
        );
        dispatch(setHotelsList(filteredHotelsList));
      })
      .catch((error: AxiosError) => {
        dispatch(setStatus(`Error: ${error.response}`));
      });
  };

export const getHotelsFormData =
  (HotelsFormData: string): AppThunk =>
  async (dispatch: any) => {
    await dispatch(setStatus('Loading...'));
    dispatch(setHotelsFormData(HotelsFormData));
  };

// actions
export const { setStatus } = searchSlice.actions;
export const { setCountriesList } = searchSlice.actions;
export const { setCitiesFromList } = searchSlice.actions;
export const { setCitiesToList } = searchSlice.actions;
export const { setCountryFrom } = searchSlice.actions;
export const { setCountryTo } = searchSlice.actions;
export const { setCarsList } = searchSlice.actions;
export const { setCarsFormData } = searchSlice.actions;
export const { setFlightsList } = searchSlice.actions;
export const { setFlightsFormData } = searchSlice.actions;
export const { setHotelsList } = searchSlice.actions;
export const { setHotelsFormData } = searchSlice.actions;

export default searchSlice.reducer;
