import React, { useState, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import CountryTotalsTable from "../../components/CountryTotalsTable/CountryTotalsTable";
import { SummaryCountry } from "../../types/types";

import Select from "react-select";

import { BreadCrumb } from "primereact/breadcrumb";
import { useSummary } from "../../hooks/useSummary";

type selectLabel = {
  label: string;
  value: string;
};

export const CountryList = () => {
  const summary = useSummary();
  const [tableData, setTableData] = useState([] as SummaryCountry[]);
  const [selectOptions, setSelectOptions] = useState([] as selectLabel[]);
  const [selectValue, setSelectValue] = useState([] as selectLabel[]);

  const breadCrumbs = [{ label: "Countries", url: "/countries" }];

  const home = {
    icon: "pi pi-home",
    url: "/",
    label: "Home",
  };

  const makeSelectOptions = (countries: SummaryCountry[]) => {
    // takes the countries list return from api and builds select options

    const options: selectLabel[] = [];
    if (countries) {
      countries.forEach((country) => {
        options.push({ label: country.Country, value: country.CountryCode });
      });
    }
    return options;
  };

  const handleFilterChange = (value: any) => setSelectValue(value);

  useEffect(() => {
    // Set tableData and select options once summary api response received
    setTableData(summary.Countries);
    setSelectOptions(makeSelectOptions(summary.Countries));
  }, [summary]);

  useEffect(() => {
    const filterTableData = () => {
      const allCountryData = summary.Countries;
      //Push a selected country codes into keys
      const keys: string[] = [];
      selectValue.forEach((val) => {
        keys.push(val.value);
      });
      // Filter Country list to contain only countries with CountryCode in keys
      const filteredData = allCountryData.filter((country) =>
        keys.indexOf(country.CountryCode) > -1 ? country : null
      );
      // Set table data to only filtered data
      setTableData(filteredData);
    };

    // Reset Table Data if Select contains no value
    if (selectValue === null || selectValue.length === 0) {
      setTableData(summary.Countries);
      return;
    }
    // Set table data if filter is selected
    if (selectValue.length > 0) {
      filterTableData();
    }
  }, [selectValue, summary.Countries]);

  if (!tableData) return <Loader />;
  return (
    <div>
      <BreadCrumb model={breadCrumbs} home={home} />
      <Wrapper>
        <h1>All Countries</h1>
        <Select
          options={selectOptions}
          isMulti
          placeholder="Filter By Country"
          onChange={handleFilterChange}
          value={selectValue}
        />
        <CountryTotalsTable data={tableData} showFooter={false} />
      </Wrapper>
    </div>
  );
};
