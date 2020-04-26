import React from "react";
import { StatTile } from "../StatTile/StatTile";

export const Stats = ({ totalDeaths, totalConfirmed, totalRecovered }) => {
  return (
    <div className="Stats">
      <StatTile
        title="Confirmed Cases"
        stat={totalConfirmed}
        icon="fas fa-clinic-medical"
        color="#f2994a"
      />
      <StatTile
        title="Recovered"
        stat={totalRecovered}
        icon="fas fa-user-shield"
        color="#27ae60"
      />
      <StatTile
        title="Deaths"
        stat={totalDeaths}
        icon="fas fa-exclamation-triangle"
        color="#eb5757"
      />
    </div>
  );
};
