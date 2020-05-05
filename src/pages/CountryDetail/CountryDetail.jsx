import React, { useState, useEffect } from "react";
import Stats from "../../components/Stats/Stats";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { DailyTotalsTable } from "../../components/DailyTotalsTable/DailyTotalsTable";
import { useDayOne } from "../../hooks/useDayOne.tsx";
import { dayOneNewStats } from "../../helpers/dataHelper";
import { BreadCrumb } from "primereact/breadcrumb";
import { Loader } from "../../components/Loader/Loader";
import { useSummary } from "../../hooks/useSummary";
import {
  DailyBarChart,
  buildDailyDeaths,
  buildDailyCases,
} from "../../components/DailyBarChart/DailyBarChart";

export const CountryDetail = (props) => {
  const { slug } = props.match.params;
  const summary = useSummary();
  const [country, setCountry] = useState({});
  const dayOneUrl = `https://api.covid19api.com/total/dayone/country/${slug}`;
  const dayOneData = useDayOne(dayOneUrl);
  const [dayOneNewData, setDayOneNewData] = useState([]);
  const [deathsChartData, setDeathsChartData] = useState({});
  const [casesChartData, setCasesChartData] = useState({});

  const breadCrumbs = [
    { label: "Countries", url: "/countries" },
    { label: country.Country },
  ];

  const home = {
    icon: "pi pi-home",
    url: "/",
    label: "Home",
  };

  useEffect(() => {
    // Set country data based on slug
    if (summary.Countries) {
      setCountry(summary.Countries.find((country) => country.Slug === slug));
    }
  }, [summary, slug]);

  useEffect(() => {
    // Convert and set day one data
    setDayOneNewData(dayOneNewStats(dayOneData));
  }, [dayOneData]);

  useEffect(() => {
    setDeathsChartData(buildDailyDeaths(dayOneNewData));
    setCasesChartData(buildDailyCases(dayOneNewData));
  }, [dayOneNewData]);

  if (!country) return <Loader />;
  const { Country, TotalDeaths, TotalConfirmed, TotalRecovered } = country;
  return (
    <div>
      <BreadCrumb model={breadCrumbs} home={home} />
      <Wrapper>
        <h1>{Country}</h1>
        <Stats
          totalConfirmed={TotalConfirmed}
          totalDeaths={TotalDeaths}
          totalRecovered={TotalRecovered}
        />
        <DailyBarChart data={deathsChartData} title="Daily Deaths" />
        <DailyBarChart data={casesChartData} title="Daily New Cases" />
        <DailyTotalsTable
          data={dayOneNewData}
          title="Daily New Totals"
          exportFileName={`DailyTotals-${country.Country}.csv`}
        />
      </Wrapper>
    </div>
  );
};
