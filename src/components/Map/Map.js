import React, { memo, useContext } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { SummaryContext } from "../../contexts/summary";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const generateTooltip = (iso2, countries) => {
  if (countries) {
    const country = countries.find((country) => country.CountryCode === iso2);
    if (!country.Country) return "Unknown Country";
    return `
    ${country.Country}
    Cases: ${country.TotalConfirmed}\n
    Deaths: ${country.TotalDeaths}\n
    Recovered: ${country.TotalRecovered}\n
    `;
  }
};

export const Map = ({ setTooltipContent }) => {
  const summary = useContext(SummaryContext);
  console.log("country: ", generateTooltip("GB", summary.Countries));
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { ISO_A2 } = geo.properties;
                    setTooltipContent(
                      generateTooltip(ISO_A2, summary.Countries)
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(Map);
