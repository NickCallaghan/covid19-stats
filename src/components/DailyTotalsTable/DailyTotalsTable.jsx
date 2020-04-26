import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatNumber } from "../../helpers/formatters";
import { Link } from "react-router-dom";

import "./DailyTotalsTable.scss";

export const DailyTotalsTable = ({ title, data, showFooter = false }) => {
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

  if (data.length === 0) return <div>Loading</div>;
  return (
    <div className="Table">
      <h2>{title}</h2>
      <DataTable
        value={data}
        autoLayout={true}
        rowHover={true}
        // footer={showFooter ? footerTemplate() : false}
      >
        <Column
          field="Date"
          header="Date"
          sortable={true}
          body={(rowData) => dateColumnTemplate(rowData)}
        />

        <Column
          field="Confirmed"
          header="Confirmed"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "Confirmed")}
        />

        <Column
          field="Deaths"
          header="Deaths"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "Deaths")}
        />

        <Column
          field="Recovered"
          header="Recovered"
          sortable={true}
          style={numberColStyle}
          body={(rowData) => numberTemplate(rowData, "Recovered")}
        />
      </DataTable>
    </div>
  );
};
