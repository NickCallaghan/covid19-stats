import React, { createContext } from "react";
import { useSummary } from "../hooks/useSummary";

export const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
  const summary = useSummary();

  return (
    <SummaryContext.Provider value={summary}>
      {children}
    </SummaryContext.Provider>
  );
};
