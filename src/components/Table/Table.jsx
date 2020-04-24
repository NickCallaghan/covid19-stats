import React, { useState } from "react";
import { DataTable, Column } from "primereact/datatable";
import { formatNumber } from "../../helpers/formatters";
import "./Table.scss";

export const Table = ({ title, data }) => {
  const numberColStyle = {
    textAlign: "center",
  };

  const numberTemplate = (rowData, column) => {
    return formatNumber(rowData[column]);
  };

  return (
    <div className="Table">
      <h2>{title}</h2>
      <DataTable value={data} autoLayout={true}>
        <Column field="Country" header="Country" />
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
