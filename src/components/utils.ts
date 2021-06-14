import moment from 'moment';

// Types
export type TFlightsFormData = {
  cityFrom: string;
  cityTo: string;
  countryFrom: string;
  countryTo: string;
  dateFrom: string;
  dateTo: string;
};

export type THotelsFormData = {
  city: string;
  amenities: string;
  country: string;
  dateFrom: string;
  dateTo: string;
};

export type TCarsFormData = {
  carsType: string;
  city: string;
  country: string;
  dateFrom: string;
  dateTo: string;
};

export interface IFlightsHistoryData extends TFlightsFormData {
  type: string;
  id: string;
}
export interface IHotelsHistoryData extends THotelsFormData {
  type: string;
  id: string;
}
export interface ICarsHistoryData extends TCarsFormData {
  type: string;
  id: string;
}
export type TFlight = {
  depart: TDepart;
  return: TReturn;
};
export type TCar = {
  id: string;
  Model: string;
  Manufacturer: string;
  Year: string;
  Type: string;
  Price: string;
  Seats: number;
};

type TDepart = {
  id: string;
  Airline: string;
  FlightNumber: string;
  Price: string;
  DepartureTime: string;
  ArrivalTime: string;
};
type TReturn = {
  id: string;
  Airline: string;
  FlightNumber: string;
  Price: string;
  DepartureTime: string;
  ArrivalTime: string;
};

// functions
export const dateNow = moment().format('YYYY-MM-DD');
export const dateNowPlusYear = moment().add(1, 'year').format('YYYY-MM-DD');

export function localStorageUpdateHistory<T>(data: T): void {
  const historyDataFromStorage = getHistoryData();
  historyDataFromStorage === null
    ? localStorage.setItem('searchHistory', JSON.stringify([data]))
    : localStorage.setItem('searchHistory', JSON.stringify([...historyDataFromStorage, data]));
}

export const getHistoryData = ():
  | IFlightsHistoryData[]
  | IHotelsHistoryData[]
  | ICarsHistoryData[]
  | null => {
  const data: any = localStorage.getItem('searchHistory');
  try {
    return JSON.parse(data);
  } catch (ex) {
    return null;
  }
};
