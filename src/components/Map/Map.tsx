import React, { memo, useContext, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { SummaryContext } from "../../contexts/summary";

import { SummaryCountry, Summary } from "../../types/types";

import "./Map.scss";

// The goemoetries describe the different map shapes and the countries they relate to
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

type Props = {
  setTooltipContent: (tip: string | undefined) => void;
};
const Map: React.FC<Props> = ({ setTooltipContent }) => {
  const summary: Summary = useContext(SummaryContext);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  //Zoom out map
  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  //Zoom in map
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  // Reset Map
  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  // Generates the tooltip text for a given geometry
  const generateTooltip = (
    iso2: string,
    countries: SummaryCountry[]
  ): string => {
    if (countries) {
      const country = countries.find((country) => country.CountryCode === iso2);
      if (!country) return "Unknown Country";
      return `
      ${country.Country} - 
      Cases: ${country.TotalConfirmed}
      Deaths: ${country.TotalDeaths}
      Recovered: ${country.TotalRecovered}
      `;
    }
    return "Unable to fetch data";
  };

  return (
    <div className="Map">
      <h2>Global Cases Map</h2>
      <ComposableMap
        className="Map-container"
        data-tip=""
        projectionConfig={{ scale: 200 }}
      >
        <ZoomableGroup zoom={position.zoom} center={[0, 0]}>
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
      {/* Flex box map controls container */}
      <div className="controls">
        <button
          aria-label="Reset Map Zoom"
          className="button-reset"
          onClick={handleReset}
        >
          Reset
        </button>
        <div className="zoomControls">
          <button aria-label="Zoom Map In" onClick={handleZoomIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button aria-label="Zoom Map Out" onClick={handleZoomOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Map);
