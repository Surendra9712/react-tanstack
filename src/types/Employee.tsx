import Person from "./Person";
import Role from "./Role";

interface Employee {
  id: number;
  employeeName: string;
  employeeNo?: number;
  userRoles?: Role[];
  email?: string;
  departmentId?: number;
  managerOf?: Person[];
  reportsTo?: Person | null;
  //notes: EmployeeNote[];
}

export default Employee;
