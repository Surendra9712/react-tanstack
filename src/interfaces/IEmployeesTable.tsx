import Employee from "@/types/Employee";

export interface IEmployeesTable {
  employeesList: Employee[] | undefined;
  onEmployeeClick: (personId: number) => void;
}
