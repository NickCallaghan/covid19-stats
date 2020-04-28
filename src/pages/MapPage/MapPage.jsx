import React, { useState, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { Map } from "../../components/Map/Map";
import { Wrapper } from "../../components/Wrapper/Wrapper";

export const MapPage = () => {
  const [content, setContent] = useState();

  return (
    <div>
      <h1>Map Page</h1>
      <Wrapper>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </Wrapper>
    </div>
  );
};
