import { IEmployeesTable } from "@/interfaces/IEmployeesTable";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

const EmployeesTable: React.FC<IEmployeesTable> = ({
  employeesList,
  onEmployeeClick,
}) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Employee No</TableHead>
            <TableHead>User Roles</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeesList === undefined &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            ))}
          {employeesList &&
            employeesList.map((employee) => (
              <TableRow
                key={employee.id}
                onClick={() => onEmployeeClick(employee.id)}
              >
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.employeeName}</TableCell>
                <TableCell>{employee.employeeNo}</TableCell>
                <TableCell>
                  {employee.userRoles?.length ?? 0 > 0 ? (
                    <ul>
                      {employee.userRoles?.map((role, index) => (
                        <li key={index}>
                          {role.name}
                          {index < (employee.userRoles?.length ?? 0) - 1
                            ? ","
                            : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No roles"
                  )}
                </TableCell>
                <TableCell>{employee.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
