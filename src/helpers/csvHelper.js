import { dateUTCtoLocaleString } from "./formatters";

export const makeCSVData = (data) => {
  const csvData = [];
  data.forEach((row) => {
    const keys = Object.keys(row);
    const csvLine = [];
    keys.forEach((key) => {
      console.log(key.Date);
      csvLine.push(row[key]);
    });
    csvData.push(row);
  });
  return csvData;
};
