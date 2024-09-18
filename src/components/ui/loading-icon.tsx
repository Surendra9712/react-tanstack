import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

interface LoadingIconProps {
  size?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ size = "w-4 h-4" }) => {
  return <ReloadIcon className={`mr-2 ${size} animate-spin`} />;
};

export default LoadingIcon;
