import { SummaryCountry, DayOneCountry } from "../types/types";

export const topCountries = (numResults: number, data: SummaryCountry[]) => {
  const sortedData = [...data];
  sortedData
    .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
    .splice(numResults, data.length - numResults);
  return sortedData;
};

export const bottomCountries = (numResults: number, data: SummaryCountry[]) => {
  let sortedData = [...data].filter((country) => country.TotalConfirmed > 0);
  sortedData
    .sort((a, b) => a.TotalConfirmed - b.TotalConfirmed)
    .splice(numResults, data.length - numResults);
  return sortedData;
};

export const noCasesCountries = (data: SummaryCountry[]) => {
  const filteredData = data.filter((country) => country.TotalConfirmed === 0);
  return filteredData;
};

export const dayOneNewStats = (data: DayOneCountry[]) => {
  // Takes the day one data and add fields for NewDeaths, NewRecovered, NewActive
  const newData: DayOneCountry[] = [];
  data.forEach((day, i) => {
    if (i === 0) {
      // Push first row
      const dayUpdated: DayOneCountry = {
        Country: day.Country,
        CountryCode: day.CountryCode,
        Province: day.Province,
        City: day.City,
        CityCode: day.CityCode,
        Lat: day.Lat,
        Lon: day.Lon,
        Confirmed: day.Confirmed,
        NewConfirmed: day.Confirmed,
        Deaths: day.Deaths,
        NewDeaths: day.Deaths,
        Recovered: day.Recovered,
        NewRecovered: day.Recovered,
        Active: day.Active,
        NewActive: day.Active,
        Date: day.Date,
        Slug: day.Slug,
      };
      newData.push(dayUpdated);
    } else {
      //Push Other rows
      const dayUpdated = {
        Country: day.Country,
        CountryCode: day.CountryCode,
        Province: day.Province,
        City: day.City,
        CityCode: day.CityCode,
        Lat: day.Lat,
        Lon: day.Lon,
        Confirmed: day.Confirmed,
        NewConfirmed: data[i].Confirmed - data[i - 1].Confirmed,
        Deaths: day.Deaths,
        NewDeaths: data[i].Deaths - data[i - 1].Deaths,
        Recovered: day.Recovered,
        NewRecovered: data[i].Recovered - data[i - 1].Recovered,
        Active: day.Active,
        NewActive: data[i].Active - data[i - 1].Active,
        Date: day.Date,
        Slug: day.Slug,
      };
      newData.push(dayUpdated);
    }
  });
  return newData;
};
