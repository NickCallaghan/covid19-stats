import React from "react";
import "./StatTile.scss";
import { formatNumber } from "../../helpers/formatters";

export const StatTile = ({ title, stat, icon, color }) => {
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
          {stat ? formatNumber(stat) : "-"}
        </div>
        <div className="StatTile-stats-title">{title}</div>
      </div>
    </div>
  );
};
