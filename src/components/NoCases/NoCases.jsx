import React from "react";
import { Button } from "primereact/button";
import "./NoCases.scss";

export const NoCases = ({ countries }) => {
  return (
    <div className="NoCases">
      <h3>Countires with no reported cases</h3>
      <div className="NoCases-list">
        {countries.map((country, i) => (
          <Button label={country.Country} key={i} />
        ))}
      </div>
    </div>
  );
};
