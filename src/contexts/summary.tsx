import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { Summary } from "../types/types";

export const SummaryContext = createContext<Summary>({} as Summary);

export const SummaryProvider: React.FC = ({ children }) => {
  const [summary, setSummary] = useState({} as Summary);

  // Fetch Data from the api
  useEffect(() => {
    const getData = async () => {
      try {
        const apiUrl = "https://api.covid19api.com/summary";
        const request = await axios.get(apiUrl);
        const data = request.data;
        setSummary(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <SummaryContext.Provider value={summary}>
      {children}
    </SummaryContext.Provider>
  );
};
