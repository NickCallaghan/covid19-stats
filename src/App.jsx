import React, { useState, useEffect } from "react";
import { useSummary } from "./hooks/useSummary";
import { Table } from "./components/Table/Table";
import { NoCases } from "./components/NoCases/NoCases";
import { Header } from "./components/Header/Header";
import { StatTile } from "./components/StatTile/StatTile";

import {
  topCountries,
  bottomCountries,
  noCasesCountries,
} from "./helpers/dataHelper";
import { Wrapper } from "./components/Wrapper/Wrapper";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./App.scss";

function App() {
  // const countries = useCountries();
  const summary = useSummary({});
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

  if (!summary.Global) return <div id="loading"></div>;
  return (
    <div className="App">
      <Header />
      <Wrapper>
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
      </Wrapper>
    </div>
  );
}

export default App;
