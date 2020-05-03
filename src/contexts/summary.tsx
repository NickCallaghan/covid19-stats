import React, { createContext } from "react";
import { useSummary } from "../hooks/useSummary";

import { Summary } from "../types/types";

export const SummaryContext = createContext<Summary>({} as Summary);

export const SummaryProvider: React.FC = ({ children }) => {
  const summary = useSummary();

  return (
    <SummaryContext.Provider value={summary}>
      {children}
    </SummaryContext.Provider>
  );
};
