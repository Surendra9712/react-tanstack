import {Button} from "@/components/ui/button";
import Employee from "@/types/Employee";
import {ColumnDef} from "@tanstack/react-table";

import {HandleEmployeeContext} from "./EmployeeActionContext";
import {useContext} from "react";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Icons} from "@/components/icons";
import {SortAscIcon} from "lucide-react";

export const EmployeesColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: "employeeNo",
        header: "Employee No.",
        cell: ({row}) => {
            const employee = row.original;
            return (
                <span>{employee.employeeNo??'-'}</span>
            );
        },
    },
    {
        accessorKey: "employeeName",
        header: ({column}) => {
            return (
                <Button
                    variant="subtle"
                    shade={'gray'}
                    className="!h-9 pl-0 text-title-sm font-semibold hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    {Icons.arrowSort()}
                </Button>
            );
        },
    },
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant="subtle"
                    shade={'gray'}
                    className="!h-9 pl-0 text-title-sm font-semibold hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Employee ID
                    {Icons.arrowSort()}
                </Button>
            );
        },
    },

    {
        accessorKey: "userRoles",
        header: "Roles",
        cell: ({row}) => {
            const employee = row.original;
            return (
                <ul>
                    {employee.userRoles?.map((role, index) => (
                        <li key={index}>
                            {role.name}
                            {index < (employee.userRoles?.length ?? 0) - 1 ? "," : ""}
                        </li>
                    ))}
                </ul>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const employee = row.original;
            const handleUpdateOpen = useContext(HandleEmployeeContext);
            return (
                <div>
                    <Button
                        variant={"translucent"}
                        size={'icon'}
                        className="h-8 w-8"
                        onClick={() => handleUpdateOpen(employee.id)}
                    >
                        {Icons.pen()}
                    </Button>
                </div>
            );
        },
    },
];
