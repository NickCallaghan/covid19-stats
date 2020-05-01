import React from "react";
import { Chart } from "primereact/chart";
import { extractSeries, makeLabelsDates } from "../../helpers/chart";
import "./DailyBarChart.scss";
import { Country } from "../../types/types";

// Bulids the data set for the Daily Deaths Bar Chart
export const buildDailyDeaths = (data: Country[]) => {
  const labels = makeLabelsDates(data);
  const chartDataDeaths = extractSeries(data, "NewDeaths");
  const deathsDataSet = buildDataSet("New Deaths", "#eb5757", chartDataDeaths);
  const options = buildOptions(labels, deathsDataSet);
  return options;
};

// Bulids the data set for the Daily Confirmed Cases Bar Chart
export const buildDailyCases = (data: Country[]) => {
  const labels = makeLabelsDates(data);
  const chartDataCases = extractSeries(data, "NewConfirmed");
  const casesDataSet = buildDataSet(
    "New Confirmed Cases",
    "#f2994a",
    chartDataCases
  );
  const options = buildOptions(labels, casesDataSet);
  return options;
};

// Build Data set to be inlcuded in chart options
const buildDataSet = (
  label: string,
  backgroundColor: string,
  data: number[]
) => {
  const dataset = {
    label,
    backgroundColor,
    data: [...data],
  };
  return dataset;
};

// Builds Chart Data to be passed in on data prop
const buildOptions = (labels: string[], data: {}) => {
  const options = {
    labels,
    datasets: [data],
  };
  return options;
};

type Props = {
  data: Country[];
  title: string;
};

export const DailyBarChart: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="DailyBarChart">
      <h3>{title}</h3>
      <Chart type="bar" data={data} />
    </div>
  );
};
