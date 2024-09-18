import Employee from "@/types/Employee";
import Commission from "@/types/Commission";

export interface ISalesPeopleDialog {
  isSalesPeopleDialogOpen: boolean;
  clearSalesPeopleDialog: () => void;
  salesPeople: Employee[] | undefined;
  commission: Commission | null;
}
