import Sale from "@/types/Sale";

export interface ISalesLogTable {
  salesLogs: Sale[];
  isLoading?:boolean,
  onSaleClick: (saleId: number) => void;
}