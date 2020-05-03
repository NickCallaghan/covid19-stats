import React from "react";
import { makeCSVData } from "../../helpers/csvHelper";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { formatNumber } from "../../helpers/formatters";
import { CSVLink } from "react-csv";
import { dateUTCtoLocaleString } from "../../helpers/formatters";

import "./DailyTotalsTable.scss";

import { DayOneCountry, DayOneCountryKey } from "../../types/types";

type Props = {
  title: string;
  data: DayOneCountry[];
  exportFileName: string;
};

export const DailyTotalsTable: React.FC<Props> = ({
  title,
  data,
  exportFileName = "export.csv",
}) => {
  const numberColStyle = {
    textAlign: "center",
  };

  const dateColumnTemplate = (rowData: DayOneCountry) => (
    <span>{dateUTCtoLocaleString(rowData.Date)}</span>
  );

  const numberTemplate = (rowData: DayOneCountry, column: DayOneCountryKey) => {
    return formatNumber(rowData[column] as number);
  };

  if (data.length === 0) return null;
  const csvData = makeCSVData(data);

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
        autoLayout={true}
        rowHover={true}
        sortField="Date"
        sortOrder={-1}
      >
        <Column
          field="Date"
          header="Date"
          sortable={true}
          body={(rowData: DayOneCountry) => dateColumnTemplate(rowData)}
        />

        <Column
          field="NewConfirmed"
          header=" New Confirmed"
          sortable={true}
          style={numberColStyle}
          body={(rowData: DayOneCountry) =>
            numberTemplate(rowData, "NewConfirmed")
          }
        />

        <Column
          field="NewDeaths"
          header="New Deaths"
          sortable={true}
          style={numberColStyle}
          body={(rowData: DayOneCountry) =>
            numberTemplate(rowData, "NewDeaths")
          }
        />

        <Column
          field="NewRecovered"
          header="New Recovered"
          sortable={true}
          style={numberColStyle}
          body={(rowData: DayOneCountry) =>
            numberTemplate(rowData, "NewRecovered")
          }
        />
      </DataTable>
    </div>
  );
};
