import React, { useState, useEffect } from "react";
import { Stats } from "../../components/Stats/Stats";
import { DailyBarChart } from "../../components/DailyBarChart/DailyBarChart";
import { DailyTotalsTable } from "../../components/DailyTotalsTable/DailyTotalsTable";
import { useSummary } from "../../hooks/useSummary";
import { useDayOne } from "../../hooks/useDayOne";
import { dayOneNewStats } from "../../helpers/dataHelper";

import { Loader } from "../../components/Loader/Loader";

export const CountryDetail = (props) => {
  const { slug } = props.match.params;
  const summary = useSummary();
  const [country, setCountry] = useState({});
  const dayOneUrl = `https://api.covid19api.com/total/dayone/country/${slug}`;
  const dayOneData = useDayOne(dayOneUrl);
  const [dayOneNewData, setDayOneNewData] = useState([]);

  useEffect(() => {
    // Render
    if (summary.Countries) {
      setCountry(summary.Countries.find((country) => country.Slug === slug));
    }
  }, [summary, slug]);

  useEffect(() => {
    setDayOneNewData(dayOneNewStats(dayOneData));
  }, [dayOneData]);

  if (!country) return <Loader />;
  const { Country, TotalDeaths, TotalConfirmed, TotalRecovered } = country;
  return (
    <div>
      <h1>{Country}</h1>
      <Stats
        totalConfirmed={TotalConfirmed}
        totalDeaths={TotalDeaths}
        totalRecovered={TotalRecovered}
      />
      <DailyBarChart data={dayOneNewData} title="Daily Deaths" />
      <DailyTotalsTable
        data={dayOneNewData}
        title="Daily New Totals"
        exportFileName={`DailyTotals-${country.Country}.csv`}
      />
    </div>
  );
};
