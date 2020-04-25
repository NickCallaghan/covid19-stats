import React, { useState, useEffect, useContext } from "react";
import { useSummary } from "../../hooks/useSummary";
import { Table } from "../../components/Table/Table";
import { NoCases } from "../../components/NoCases/NoCases";
import { StatTile } from "../../components/StatTile/StatTile";
import { Loader } from "../../components/Loader/Loader";

import { SummaryContext } from "../../contexts/summary";

import {
  topCountries,
  bottomCountries,
  noCasesCountries,
} from "../../helpers/dataHelper";

export const Dashboard = () => {
  // const countries = useCountries();

  const summary = useContext(SummaryContext);
  const [mostEffected, setMostEffected] = useState([]);
  const [leastEffected, setLeastEffected] = useState([]);
  const [noCases, setNoCases] = useState([]);

  useEffect(() => {
    if (summary.Countries && summary.Countries.length) {
      setNoCases(noCasesCountries(summary.Countries));
      setLeastEffected(bottomCountries(10, summary.Countries));
      setMostEffected(topCountries(10, summary.Countries));
    }
  }, [summary]);

  if (!summary.Global) return <Loader />;
  return (
    <div className="App">
      <StatTile
        title="Confirmed Cases"
        stat={summary.Global.TotalConfirmed}
        icon="fas fa-clinic-medical"
        color="#f2994a"
      />
      <StatTile
        title="Recovered"
        stat={summary.Global.TotalRecovered}
        icon="fas fa-user-shield"
        color="#27ae60"
      />
      <StatTile
        title="Deaths"
        stat={summary.Global.TotalDeaths}
        icon="fas fa-exclamation-triangle"
        color="#eb5757"
      />
      <Table title="Worst Effected Countries By Cases" data={mostEffected} />
      <Table title="Least Effected Countries By Cases" data={leastEffected} />
      <NoCases countries={noCases} />
    </div>
  );
};
