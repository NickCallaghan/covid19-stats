import React from "react";
import { makeCSVData } from "../../helpers/csvHelper";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { formatNumber } from "../../helpers/formatters";
import { CSVLink } from "react-csv";

import "./DailyTotalsTable.scss";

export const DailyTotalsTable = ({
  title,
  data,
  showFooter = false,
  exportFileName = "export.csv",
}) => {
  const numberColStyle = {
    textAlign: "center",
  };

  const dateColumnTemplate = (rowData) => {
    const utcDate = rowData.Date;
    const date = new Date(utcDate);
    return <span>{date.toLocaleDateString()}</span>;
  };

  const numberTemplate = (rowData, column) => {
    return formatNumber(rowData[column]);
  };

  const csvData = makeCSVData(data);

  if (data.length === 0) return null;
  return (
    <div className="Table">
      <h2>{title}</h2>
      <CSVLink
        className="Table-export-button"
        data={csvData}
        filename={exportFileName}
      >
        <Button label="Export as CSV" />
      </CSVLink>
      <DataTable
        value={data}
        title="Daily New Totals"
        autoLayout={true}
        rowHover={true}
      >
        <Column
          field="Date"
          header="Date"
          sortable={true}
          body={(rowData) => dateColumnTemplate(rowData)}
        />

        <Column
          field="NewConfirmed"
          header=" New Confirmed"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "NewConfirmed")}
        />

        <Column
          field="NewDeaths"
          header="New Deaths"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "NewDeaths")}
        />

        <Column
          field="NewRecovered"
          header="New Recovered"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "NewRecovered")}
        />
      </DataTable>
    </div>
  );
};
