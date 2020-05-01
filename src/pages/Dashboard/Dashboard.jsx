import React, { useState, useEffect, useContext, memo } from "react";
import CountryTotalsTable from "../../components/CountryTotalsTable/CountryTotalsTable";
import NoCases from "../../components/NoCases/NoCases";
import Stats from "../../components/Stats/Stats";
import { Loader } from "../../components/Loader/Loader";
import Wrapper from "../../components/Wrapper/Wrapper";
import Map from "../../components/Map/Map";
import { BreadCrumb } from "primereact/breadcrumb";
import ReactTooltip from "react-tooltip";

import { SummaryContext } from "../../contexts/summary";

import {
  topCountries,
  bottomCountries,
  noCasesCountries,
} from "../../helpers/dataHelper";

const Dashboard = () => {
  const summary = useContext(SummaryContext); //Summary data for all countries

  // Widget data sets
  const [mostEffected, setMostEffected] = useState([]);
  const [leastEffected, setLeastEffected] = useState([]);
  const [noCases, setNoCases] = useState([]);
  const [mapTooltip, setMapTooltip] = useState("");

  //Breadcrumbs
  const home = {
    icon: "pi pi-home",
    url: "/",
    label: "Home",
  };

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
      <BreadCrumb home={home} />
      <Wrapper>
        <h1>Global Stats</h1>
        <Stats
          totalConfirmed={TotalConfirmed}
          totalDeaths={TotalDeaths}
          totalRecovered={TotalRecovered}
        />
        <Map setTooltipContent={setMapTooltip} />
        <ReactTooltip>{mapTooltip}</ReactTooltip>

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
      </Wrapper>
    </div>
  );
};

export default memo(Dashboard);
