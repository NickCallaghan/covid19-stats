import React, { useState, useEffect, useContext } from "react";
import { CountryTotalsTable } from "../../components/CountryTotalsTable/CountryTotalsTable";
import { NoCases } from "../../components/NoCases/NoCases";
import { Stats } from "../../components/Stats/Stats";
import { Loader } from "../../components/Loader/Loader";

import { SummaryContext } from "../../contexts/summary";

import {
  topCountries,
  bottomCountries,
  noCasesCountries,
} from "../../helpers/dataHelper";

export const Dashboard = () => {
  const summary = useContext(SummaryContext); //Summary data for all countries

  // Widget data sets
  const [mostEffected, setMostEffected] = useState([]);
  const [leastEffected, setLeastEffected] = useState([]);
  const [noCases, setNoCases] = useState([]);

  // Widget data sets updated when api sucessfully called
  useEffect(() => {
    if (summary.Countries && summary.Countries.length) {
      setNoCases(noCasesCountries(summary.Countries));
      setLeastEffected(bottomCountries(10, summary.Countries));
      setMostEffected(topCountries(10, summary.Countries));
    }
  }, [summary]);

  //Loader displays until data
  if (!summary.Global) return <Loader />;
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = summary.Global;
  return (
    <div className="Dashboard">
      <h1>Global Stats</h1>
      <Stats
        totalConfirmed={TotalConfirmed}
        totalDeaths={TotalDeaths}
        totalRecovered={TotalRecovered}
      />
      <CountryTotalsTable
        title="Worst Effected Countries By Cases"
        data={mostEffected}
        sortField="TotalConfirmed"
        sortOrder={-1}
      />
      <CountryTotalsTable
        title="Least Effected Countries By Cases"
        data={leastEffected}
        sortField="TotalConfirmed"
        sortOrder={1}
      />
      <NoCases countries={noCases} />
    </div>
  );
};
