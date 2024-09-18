import React from "react";

const Error: React.FC<{ errors: string[] }> = ({ errors }) => (
  <div className="text-red-600 text-sm mt-1">
    {errors.map((error, index) => (
      <p key={index}>{error}</p>
    ))}
  </div>
);

export default Error;
