import React from "react";
import "./Wrapper.scss";

export const Wrapper: React.FC = (props) => {
  return <div className="Wrapper">{props.children}</div>;
};

export default Wrapper;
