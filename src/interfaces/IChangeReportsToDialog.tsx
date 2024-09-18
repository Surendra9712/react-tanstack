import Employee from "@/types/Employee";
import { EmployeeForm } from "@/types/EmployeeForm";
import { FormApi } from "@tanstack/react-form";

export interface IChangeReportsToDialog {
  isChangeReportsToDialogOpen?: boolean;
  clearChangeReportsToDialog?: () => void;
  handleChangeReportsTo?: ({ value }: { value: Employee | undefined }) => void;
  employee: Employee | undefined;
  managerFromDb?: Employee | undefined;
  managers?: Employee[];
  form: FormApi<EmployeeForm, undefined>;
}
