import React from "react";

const Help: React.FC<{ help: string }> = ({ help }) => (
  <p className="text-sm text-gray-500 mt-1">{help}</p>
);

export default Help;
