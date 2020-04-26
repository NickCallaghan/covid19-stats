import React, { useState, useEffect } from "react";
import { Stats } from "../../components/Stats/Stats";
import { DailyTotalsTable } from "../../components/DailyTotalsTable/DailyTotalsTable";
import { useSummary } from "../../hooks/useSummary";
import { useGetData } from "../../hooks/useGetData";

import { Loader } from "../../components/Loader/Loader";

export const CountryDetail = (props) => {
  const { slug } = props.match.params;
  const summary = useSummary();
  const [country, setCountry] = useState({});
  const dayOneUrl = `https://api.covid19api.com/total/dayone/country/${slug}`;

  const dayOne = useGetData(dayOneUrl);

  useEffect(() => {
    // Render
    if (summary.Countries) {
      setCountry(summary.Countries.find((country) => country.Slug === slug));
    }
  }, [summary, slug]);

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
      <DailyTotalsTable data={dayOne} />
    </div>
  );
};
