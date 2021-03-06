import React, { memo } from "react";
import { Button } from "primereact/button";
import "./NoCases.scss";
import { Link } from "react-router-dom";
import { SummaryCountry } from "../../types/types";

type Props = {
  countries: SummaryCountry[];
};

export const NoCases: React.FC<Props> = ({ countries }) => {
  return (
    <div className="NoCases">
      <h3>Countries with no reported cases</h3>
      <div className="NoCases-list">
        {countries.map((country, i) => (
          <Link to={`/countries/${country.Slug}`} key={`link-${i}`}>
            <Button label={country.Country} key={i} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(NoCases);
