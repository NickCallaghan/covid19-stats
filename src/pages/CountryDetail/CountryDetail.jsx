import React, { useState, useEffect } from "react";
import { useCountries } from "../../hooks//useCountries";

import { Loader } from "../../components/Loader/Loader";

export const CountryDetail = (props) => {
  const { slug } = props.match.params;
  const countries = useCountries();
  const [country, setCountry] = useState({});

  useEffect(() => {
    // Render
    if (countries) {
      setCountry(countries.find((country) => country.Slug === slug));
    }
  }, [countries, slug]);

  if (!country) return <Loader />;
  return (
    <div>
      <h1>{country.Country}</h1>
    </div>
  );
};
