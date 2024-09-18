import Department from "@/types/Department";

export interface IEmployeesDialog {
  isDialogOpen: boolean;
  clearDialog: (open: boolean) => void;
  addNoteClick: () => void;
  setNameError: (value: React.SetStateAction<string>) => void;
  setEmailError: (value: React.SetStateAction<string>) => void;
  setDepartmentError: (value: React.SetStateAction<string>) => void;
  nameError: string;
  emailError: string;
  departmentError: string;
  departments: Department[] | undefined;
}
