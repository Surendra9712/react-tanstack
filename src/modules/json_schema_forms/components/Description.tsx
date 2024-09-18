import React from "react";

const Description: React.FC<{ description: string }> = ({ description }) => (
  <p className="text-sm text-gray-500 mb-2">{description}</p>
);

export default Description;
