import Commission from "@/types/Commission";

export interface ICommissionTable {
  commissions: Commission[] | undefined;
  handleSalesPeopleClick: (commissionId: number) => void;
  handleFinanceClick: (commissionId: number) => void;
  handleLeasedClick: (commissionId: number) => void;
  headerElement: HTMLElement|null;
  isLoading?: boolean;
}
