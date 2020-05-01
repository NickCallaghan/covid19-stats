export type Country = {
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

export type CountryKey = keyof Country;
