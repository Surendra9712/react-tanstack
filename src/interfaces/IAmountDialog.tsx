import AmountType from "@/types/AmountType";
import CommissionPeriod from "@/types/CommissionPeriod";
import Employee from "@/types/Employee";

export interface IAmountDialog {
  isAmountDialogOpen?: boolean;
  clearAmountDialog?: () => void;
  handleAddAmount?: (personId: number) => void;
  employee?: Employee;
  amountTypes?: AmountType[];
  period?: CommissionPeriod;
  onMutate?: () => void;
}
