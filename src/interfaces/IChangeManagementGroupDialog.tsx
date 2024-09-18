import Employee from "@/types/Employee";

export interface IChangeManagementGroupDialog {
  isChangeManagementGroupDialogOpen: boolean;
  clearChangeManagementGroupDialog: () => void;
  handleChangeManagementGroup: () => void;
  employee: Employee;
  managementGroup: Employee[];
}