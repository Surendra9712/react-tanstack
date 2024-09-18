import Employee from "@/types/Employee";

export interface IFinanceDialog {
  isFinanceDialogOpen: boolean;
  clearFinanceDialog: () => void;
  bankName: string;
  bankFee: number;
  financeReserve: number;
}