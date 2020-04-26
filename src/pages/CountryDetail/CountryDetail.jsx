import React, { useState, useEffect } from "react";
import { useSummary } from "../../hooks/useSummary";
import { useGetData } from "../../hooks/useGetData";

import { Loader } from "../../components/Loader/Loader";

export const CountryDetail = (props) => {
  const { slug } = props.match.params;
  const summary = useSummary();
  const [country, setCountry] = useState({});
  const dayOneUrl = `https://api.covid19api.com/dayone/country/${slug}`;
  const dayOne = useGetData(dayOneUrl);

  useEffect(() => {
    // Render
    if (summary.Countries) {
      setCountry(summary.Countries.find((country) => country.Slug === slug));
    }
  }, [summary, slug]);

  if (!country) return <Loader />;
  return (
    <div>
      <h1>{country.Country}</h1>
    </div>
  );
};
