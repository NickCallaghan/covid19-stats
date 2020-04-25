import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatNumber } from "../../helpers/formatters";
import ReactTooltip from "react-tooltip";

import "./Table.scss";
import { Link } from "react-router-dom";

export const Table = ({ title, data, showFooter = true }) => {
  const numberColStyle = {
    textAlign: "center",
  };

  const numberTemplate = (rowData, column) => {
    return formatNumber(rowData[column]);
  };

  const countryColumnTemplate = (rowData, column) => {
    const utcDate = rowData.Date;
    const date = new Date(utcDate);
    return (
      <>
        <Link to={`/countries/${rowData.Slug}`}>{rowData.Country}</Link>
        <span
          className="info-icon"
          data-tip={`Last updated: ${date.toLocaleDateString()}`}
        >
          <i className="fas fa-info-circle"></i>
        </span>
      </>
    );
  };

  const footerTemplate = () => {
    return <Link to={`countries/`}>All Countries</Link>;
  };

  if (data.length === 0) return <div>Loading</div>;
  return (
    <div className="Table">
      <ReactTooltip place="right" />
      <h2>{title}</h2>
      <DataTable
        value={data}
        autoLayout={true}
        rowHover={true}
        footer={showFooter ? footerTemplate() : false}
      >
        <Column
          field="Country"
          header="Country"
          sortable={true}
          body={(rowData) => countryColumnTemplate(rowData)}
        />
        <Column
          field="TotalDeaths"
          header="Total Deaths"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "TotalDeaths")}
        />
        <Column
          field="TotalConfirmed"
          header="Total Confirmed"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "TotalConfirmed")}
        />
        <Column
          field="TotalRecovered"
          header="Total Recovered"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "TotalRecovered")}
        />
      </DataTable>
    </div>
  );
};
