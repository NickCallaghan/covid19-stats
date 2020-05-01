// Country Type as returned by Summary API endpoint -- https://api.covid19api.com/summary
// The oprional fields are added clientside
export type DayOneCountry = {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  NewConfirmed?: number;
  Country: string;
  Slug: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  NewDeaths?: number;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
  NewRecovered?: number;
};

export type DayOneCountryKey = keyof DayOneCountry;

// Country Type as returned by Summary API endpoint -- https://api.covid19api.com/summary
export type SummaryCountry = {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
};

export type SummaryCountryKey = keyof SummaryCountry;
