import { useState, useEffect } from "react";
import axios from "axios";

export const useDayOne = (slug: string) => {
  const [data, setData] = useState([]);
  const url = `https://api.covid19api.com/total/dayone/country/${slug}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await axios.get(url);
        const responseData = await request.data;
        setData(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [url]);

  return data;
};
