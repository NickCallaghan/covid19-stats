import { dateUTCtoLocaleString } from "./formatters";

// make Chart Date Labels
export const makeLabelsDates = (data) => {
  const labels = [];
  data.forEach((row) => {
    labels.push(dateUTCtoLocaleString(row.Date));
  });
  return labels;
};

// Extract Data Series for chart
export const extractSeries = (data, columnName) => {
  const chartData = [];
  data.forEach((row) => {
    chartData.push(row[columnName]);
  });
  return chartData;
};
