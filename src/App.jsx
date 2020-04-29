import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { CountryDetail } from "./pages/CountryDetail/CountryDetail";
import { CountryList } from "./pages/CountryList/CountryList";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./App.scss";

const routes = (
  <Switch>
    <Route
      exact
      path={`/`}
      render={(routeProps) => <Dashboard {...routeProps} />}
    />
    <Route
      exact
      path={`/countries`}
      render={(routeProps) => <CountryList {...routeProps} />}
    />
    <Route
      exact
      path={`/countries/:slug`}
      render={(routeProps) => <CountryDetail {...routeProps} />}
    />
    <Route render={(routeProps) => <h1>Not Found</h1>} />
  </Switch>
);

function App() {
  return (
    <div>
      <Header />
      {routes}
    </div>
  );
}

export default App;
