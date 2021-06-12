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
  cityFrom: string;
  amenities: string;
  countryFrom: string;
  dateFrom: string;
  dateTo: string;
};

export type TCarsFormData = {
  carsType: string;
  cityFrom: string;
  countryFrom: string;
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
// type Nullable<T> = IFlightsHistoryData | null;
export const dateNow = moment().format('YYYY-MM-DD');
export const dateNowPlusYear = moment().add(1, 'year').format('YYYY-MM-DD');

export const localStorageUpdateHistory = (data: IFlightsHistoryData[]) => {
  localStorage.setItem('searchHistory', JSON.stringify(data));
};

export const getHistoryData = (): IFlightsHistoryData[] | null => {
  const data: any = localStorage.getItem('searchHistory');
  try {
    return JSON.parse(data);
  } catch (ex) {
    return null;
  }
};
