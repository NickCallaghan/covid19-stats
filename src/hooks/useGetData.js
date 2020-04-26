import { useState, useEffect } from "react";
import axios from "axios";

export const useGetData = (url) => {
  const [data, setData] = useState({});

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

  return;
};
