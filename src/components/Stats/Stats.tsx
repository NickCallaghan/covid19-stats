import React, { memo } from "react";
import { StatTile } from "../StatTile/StatTile";
import "./Stats.scss";

type Props = {
  totalDeaths: number;
  totalConfirmed: number;
  totalRecovered: number;
};

const Stats: React.FC<Props> = ({
  totalDeaths,
  totalConfirmed,
  totalRecovered,
}) => {
  return (
    <div className="Stats">
      <StatTile
        title="Deaths"
        stat={totalDeaths}
        icon="fas fa-exclamation-triangle"
        color="#eb5757"
      />
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
    </div>
  );
};
export default memo(Stats);
