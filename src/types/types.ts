export type DayOneDay = {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  NewConfirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  NewDeaths: number;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
  NewRecovered: number;
};

export type DayOneKey = keyof DayOneDay;

export type Country = {
  Slug: string;
  Country: string;
};
