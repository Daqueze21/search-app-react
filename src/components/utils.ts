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

export interface IFlightsHistoryData extends TFlightsFormData {
  type: string;
  id: string;
}

export const dateNow = moment().format('YYYY-MM-DD');
export const dateNowPlusYear = moment().add(1, 'year').format('YYYY-MM-DD');

export const localStorageUpdateHistory = (data: IFlightsHistoryData[]) => {
  localStorage.setItem('searchHistory', JSON.stringify(data));
};
