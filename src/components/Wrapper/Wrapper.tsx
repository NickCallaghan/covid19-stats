import React, { memo } from "react";
import "./Wrapper.scss";

export const Wrapper: React.FC = ({ children }) => {
  return <div className="Wrapper">{children}</div>;
};

export default memo(Wrapper);
