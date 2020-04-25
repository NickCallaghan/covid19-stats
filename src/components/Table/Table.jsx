import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatNumber } from "../../helpers/formatters";
import "./Table.scss";
import { Link } from "react-router-dom";

export const Table = ({ title, data }) => {
  const numberColStyle = {
    textAlign: "center",
  };

  const numberTemplate = (rowData, column) => {
    return formatNumber(rowData[column]);
  };

  const countryColumnTemplate = (rowData, column) => {
    return <Link to={`countries/${rowData.Slug}`}>{rowData.Country}</Link>;
  };

  const footerTemplate = () => {
    return <Link to={`countries/`}>All Countries</Link>;
  };

  if (data.length === 0) return <div>Loading</div>;
  return (
    <div className="Table">
      <h2>{title}</h2>
      <DataTable value={data} autoLayout={true} footer={footerTemplate()}>
        <Column
          field="Country"
          header="Country"
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
