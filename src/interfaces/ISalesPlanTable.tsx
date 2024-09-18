import Employee from "@/types/Employee";
import SalesPlan from "@/types/SalesPlan";

export interface ISalesPlanTable {
  salesPlans: SalesPlan[];
  onPlanClick: (salesPlanId: number) => void;
  participants?: Employee[];
}
