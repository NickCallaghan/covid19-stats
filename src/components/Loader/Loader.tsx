import React from "react";
import "./Loader.scss";

export const Loader: React.FC = () => {
  return (
    <div className="Loader">
      <div className="Loader-text">Loading...</div>
      <div className="Loader-spinner"></div>
    </div>
  );
};
