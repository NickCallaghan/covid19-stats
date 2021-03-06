import { BreadCrumb } from "primereact/breadcrumb";
import { Loader } from "../../components/Loader/Loader";
import { useSummary } from "../../hooks/useSummary";
import CountryTotalsTable from "../../components/CountryTotalsTable/CountryTotalsTable";
import Map from "../../components/Map/Map";
import NoCases from "../../components/NoCases/NoCases";
import React, { useState, useEffect, memo } from "react";
import ReactTooltip from "react-tooltip";
import Stats from "../../components/Stats/Stats";
import Wrapper from "../../components/Wrapper/Wrapper";

import {
  topCountries,
  bottomCountries,
  noCasesCountries,
} from "../../helpers/dataHelper";

import { SummaryCountry } from "../../types/types";

const Dashboard: React.FC = () => {
  const summary = useSummary(); // Fetch data from api

  // Widget data sets
  const [mostEffected, setMostEffected] = useState([] as SummaryCountry[]);
  const [leastEffected, setLeastEffected] = useState([] as SummaryCountry[]);
  const [noCases, setNoCases] = useState([] as SummaryCountry[]);
  const [mapTooltip, setMapTooltip] = useState("" as any); //

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
