import React from "react";
import "./StatTile.scss";
import { formatNumber } from "../../helpers/formatters";

type Props = {
  title: string;
  stat: string;
  icon: string;
  color: string;
};

export const StatTile: React.FC<Props> = ({ title, stat, icon, color }) => {
  const tileStyles = {
    backgroundColor: color,
  };

  return (
    <div className="StatTile" style={tileStyles}>
      <div className="StatTile-icon">
        <i className={icon}></i>
      </div>
      <div className="StatTile-stats">
        <div className="StatTile-stats-stat">
          {stat ? formatNumber(parseInt(stat)) : "-"}
        </div>
        <div className="StatTile-stats-title">{title}</div>
      </div>
    </div>
  );
};
