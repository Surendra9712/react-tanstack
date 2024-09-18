import { useState} from "react";
import {cn} from "@/lib/utils";
import {CheckIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useEmployees from "@/hooks/use-employees";
import {Icons} from "@/components/icons";

interface IEmployeesComboBoxProps {
    value: string | undefined;
    setValue: (value: string) => void;
}

function EmployeesComboBox({value, setValue}: IEmployeesComboBoxProps) {
    const [open, setOpen] = useState(false);

    const {GetEmployees} = useEmployees();
    const {
        data: employees,
        isLoading: employeesIsLoading,
        error: employeesError,
        refetch: refetchEmployees,
    } = GetEmployees();

    employees?.map((employee) => {
        if (employee === undefined || employee.id === undefined) {
            return <Button disabled>No employees found.</Button>;
        }
    });

    if (employeesIsLoading) {
        return <Button disabled>Loading...</Button>;
    }

    if (!employees || !Array.isArray(employees)) {
        return <Button disabled>No employees found.</Button>;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    shade={'gray'}
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-full max-w-44 xl:max-w-60 text-left border-gray-200 !px-3  text-200 font-normal text-body-lg"
                >
                    <div className="flex flex-1 overflow-hidden justify-start gap-2 items-center">
                        <span>{Icons.peopleTeam()}</span>
                        <span
                            className="truncate text-200 w-full">{employees.find((employee) => employee.id.toString() === value)?.employeeName ?? "Choose employee"}</span>
                    </div>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${open && 'rotate-180'}`}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`max-w-60 p-0`}>
                <Command>
                    <CommandInput placeholder="Search employee..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No employee found.</CommandEmpty>
                        <CommandGroup>
                            {employees.map((employee) => (
                                <CommandItem
                                    keywords={employee.employeeName
                                        .toLowerCase()
                                        .trim()
                                        .split(" ")}
                                    key={employee.id.toString()}
                                    value={employee.id.toString()}
                                    aria-current={value === employee.id.toString()}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <span className="truncate">{employee.employeeName}</span>
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === employee.id.toString()
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default EmployeesComboBox;
