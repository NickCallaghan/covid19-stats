import React from "react";

export const CountryDetail = (props) => {
  const { country } = props.match.params;
  return (
    <div>
      <h1>{country}</h1>
    </div>
  );
};
