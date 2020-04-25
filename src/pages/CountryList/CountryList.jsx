import React, { useContext, useState, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Table } from "../../components/Table/Table";
import { SummaryContext } from "../../contexts/summary";
import Select from "react-select";

import "./CountryList.scss";

const testSuggestions = ["Country 1", "Country 2", "Country 3", "Country 4"];

export const CountryList = () => {
  const summary = useContext(SummaryContext);
  const [countryFilter, setCountryFilter] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);

  const makeSelectOptions = (countries) => {
    const options = [];
    if (countries) {
      countries.forEach((country) => {
        options.push({ label: country.Country, value: country.CountryCode });
      });
    }

    return options;
  };

  useEffect(() => {
    setTableData(summary.Countries);
    setSelectOptions(makeSelectOptions(summary.Countries));
  }, [summary]);

  if (!tableData) return <Loader />;
  return (
    <div>
      <Select options={selectOptions} isMulti placeholder="Filter By Country" />
      <Table title="All Countries By Cases" data={tableData} />
    </div>
  );
};
