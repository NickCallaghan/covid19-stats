import { useState, useEffect } from "react";
import axios from "axios";

export const useSummary = () => {
  const [summary, setSummary] = useState({});

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

  return summary;
};
