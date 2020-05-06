import { useContext } from "react";
import { SummaryContext } from "../contexts/summary";

export const useSummary = () => {
  const summary = useContext(SummaryContext);

  return summary;
};
