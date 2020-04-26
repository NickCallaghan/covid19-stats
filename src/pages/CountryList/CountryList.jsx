import React, { useContext, useState, useEffect, useRef } from "react";
import { Loader } from "../../components/Loader/Loader";
import { CountryTotalsTable } from "../../components/CountryTotalsTable/CountryTotalsTable";
import { SummaryContext } from "../../contexts/summary";
import Select from "react-select";

import "./CountryList.scss";

export const CountryList = () => {
  const summary = useContext(SummaryContext);
  const [tableData, setTableData] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);
  const countryFilter = useRef();

  const makeSelectOptions = (countries) => {
    // takes the countries list return from api and builds select options
    const options = [];
    if (countries) {
      countries.forEach((country) => {
        options.push({ label: country.Country, value: country.CountryCode });
      });
    }

    return options;
  };

  useEffect(() => {
    // Set tableData and select options once api response received
    setTableData(summary.Countries);
    setSelectOptions(makeSelectOptions(summary.Countries));
  }, [summary]);

  if (!tableData) return <Loader />;
  return (
    <div>
      <h1>All Countries</h1>
      <Select
        options={selectOptions}
        isMulti
        placeholder="Filter By Country"
        onInputChange={(e) => console.log(e)}
      />
      <CountryTotalsTable data={tableData} showFooter={false} />
    </div>
  );
};
