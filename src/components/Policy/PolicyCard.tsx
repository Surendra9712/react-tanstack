import React, { useState } from "react";
import { IPolicyCard } from "@/interfaces/IPolicyCard";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {Title} from "@radix-ui/react-toast";

const PolicyCard: React.FC<IPolicyCard> = ({ title, onView }) => {
  return (
    <Title className="text-title-md cursor-pointer p-4 font-semibold" onClick={onView}>{title}</Title>
  );
};

export default PolicyCard;
