import React from "react";
import { Loader } from "../Loader/Loader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatNumber } from "../../helpers/formatters";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { CSVLink } from "react-csv";
import { Button } from "primereact/button";
import { makeCSVData } from "../../helpers/csvHelper";
import { dateUTCtoLocaleString } from "../../helpers/formatters";

import "./CountryTotalsTable.scss";

export const CountryTotalsTable = ({ title, data, showFooter = true }) => {
  const numberColStyle = {
    textAlign: "center",
  };

  const numberTemplate = (rowData, column) => {
    return formatNumber(rowData[column]);
  };

  const countryColumnTemplate = (rowData) => {
    return (
      <>
        <Link to={`/countries/${rowData.Slug}`}>{rowData.Country}</Link>
        <span
          className="info-icon"
          data-tip={`Last updated: ${dateUTCtoLocaleString(rowData.Date)}`}
        >
          <i className="fas fa-info-circle"></i>
        </span>
      </>
    );
  };

  const footerTemplate = () => {
    return <Link to={`countries/`}>All Countries</Link>;
  };

  if (data.length === 0) return <Loader />;
  const csvData = makeCSVData(data);
  const exportFileName = `Export-Countries.csv`;

  return (
    <div className="Table">
      <ReactTooltip place="right" />
      {title && <h2>{title}</h2>}
      <CSVLink
        className="Table-export-button"
        data={csvData}
        filename={exportFileName}
      >
        <Button label="Export as CSV" />
      </CSVLink>
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
          field="TotalConfirmed"
          header="Total Confirmed"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "TotalConfirmed")}
        />
        <Column
          field="TotalDeaths"
          header="Total Deaths"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "TotalDeaths")}
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
