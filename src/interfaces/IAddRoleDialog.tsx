import Employee from "@/types/Employee";
import { EmployeeForm } from "@/types/EmployeeForm";
import Role from "@/types/Role";
import { FieldApi, FormApi } from "@tanstack/react-form";

export interface IAddRoleDialog {
  isAddRoleDialogOpen?: boolean;
  clearAddRoleDialog?: () => void;
  handleAddRole?: (roleId: string) => void;
  employee?: Employee;
  employeeRoles?: Role[];
  roleRef?: React.RefObject<HTMLSpanElement>;
  field: FieldApi<any, any, any, any>;
}
