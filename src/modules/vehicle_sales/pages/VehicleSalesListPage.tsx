import React from "react";
import { columns, VehicleSale } from "../columns";
import { DataTable } from "@/components/ui/data-table"; // Replace with the actual import path

const CallLogsListPage: React.FC = () => {
  // Simulated API data
  const data: VehicleSale[] = [
    {
      id: "1",
      customer_name: "John Doe",
      sale_completed: "11/11/2011",
      financeUserId: 1,
      deal_date: "11/11/2011",
    },
    // ... more data
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CallLogsListPage;
