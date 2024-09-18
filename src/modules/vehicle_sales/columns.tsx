import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type VehicleSale = {
  id: string;
  sale_completed: string;
  customer_name: string;
  financeUserId: number;
  deal_date: string;
};

export const columns: ColumnDef<VehicleSale>[] = [
  {
    accessorKey: "sale_completed",
    header: "Sale Completed",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "financeUserId",
    header: "Duration (s)",
  },
  {
    accessorKey: "deal_date",
    header: "Deal Date",
  },
];
