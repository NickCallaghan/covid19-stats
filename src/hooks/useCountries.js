import { useState, useEffect } from "react";
import axios from "axios";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const apiUrl = "https://api.covid19api.com/countries";
        const request = await axios.get(apiUrl);
        const data = request.data;
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return countries;
};
