import React from "react";

const HeaderText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const style: React.CSSProperties = {
    position: "absolute",
    border: "0px",
    width: "1px",
    height: "1px",
    padding: "0px",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0px, 0px, 0px, 0px)",
    whiteSpace: "nowrap",
    overflowWrap: "normal" as const,
  };

  return <span style={style}>{children}</span>;
};

export default HeaderText;
