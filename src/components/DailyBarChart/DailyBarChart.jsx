import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

import { dateUTCtoLocaleString } from "../../helpers/formatters";
import "./DailyBarChart.scss";

// make Chart Date Labels
const makeLabelsDates = (data) => {
  const labels = [];
  data.forEach((row) => {
    labels.push(dateUTCtoLocaleString(row.Date));
  });
  return labels;
};

// Extract Data Series for chart
const extractSeries = (data, columnName) => {
  const chartData = [];
  data.forEach((row) => {
    chartData.push(row[columnName]);
  });
  return chartData;
};

export const DailyBarChart = ({ data, title }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataDeaths, setChartDataDeaths] = useState([]);

  const options = {
    labels: chartLabels,
    datasets: [
      {
        label: "Deaths",
        backgroundColor: "#eb5757",
        data: chartDataDeaths,
      },
    ],
  };

  useEffect(() => {
    if (data) {
      const labels = makeLabelsDates(data);
      const chartDataDeaths = extractSeries(data, "NewDeaths");
      setChartLabels(labels);
      setChartDataDeaths(chartDataDeaths);
    }
  }, [data]);

  return (
    <div className="DailyBarChart">
      <h3>{title}</h3>
      <Chart type="bar" data={options} />
    </div>
  );
};
