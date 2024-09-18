import React, { useEffect, useState } from "react";
import EmployeesDialog from "./EmployeesDialog";
import useEmployees from "@/hooks/use-employees";
import useEmployeeSearchParams from "./hooks/use-employee-search-parms";
import EmpDataTable from "./employees-table/employees-data-table";
import { EmployeesColumns } from "./employees-table/employees-columns";
import { HandleEmployeeContext } from "./employees-table/EmployeeActionContext";
import {Card} from "@/components/ui/card";
import setPageTitle from "@/hooks/setPageTitle";

const EmployeesListComponent: React.FC = () => {
  setPageTitle("Employees");
  //dialogs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [isAmountDialogOpen, setIsAmountDialogOpen] = useState(false);
  //Error state
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [departmentError, setDepartmentError] = useState<string>("");
  //form values

  //Create url params for the dialog state
  const { getDialogParam, setDialogParam, getEmployeeId, setEmployeeId } =
    useEmployeeSearchParams();

  //dialog state
  const [dialogMode, setDialogMode] = useState<
    | "create"
    | "edit"
    | "view"
    | "notes"
    | "amounts"
    | "addRole"
    | "changeReportsTo"
    | "changeManagementGroup"
  >("create");
  //form data and functions
  const { GetEmployees, DeleteEmployee, GetDepartments, GetRoles } =
    useEmployees();
  const {
    data: employees,
    isLoading: employeesIsLoading,
    error: employeesError,
    refetch,
  } = GetEmployees();

  const {
    status: statusDelete,
    error: errorDelete,
    mutate: mutateDelete,
  } = DeleteEmployee();
  const {
    data: departments,
    isLoading: currentDepartmentsIsLoading,
    error: currentDepartmentsError,
  } = GetDepartments();
  const {
    data: roles,
    isLoading: currentRolesIsLoading,
    error: currentRolesError,
  } = GetRoles();

  //#region dialog functions
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // //#region event handlers
  const handleUpdateOpen = async (personId: number) => {
    // Set the dialog to "edit" mode and fetch the policy by ID
    setDialogMode("edit");
    setDialogParam("Update");
    openDialog();
    setEmployeeId(personId.toString());
  };

  const handleCreateOpen = async () => {
    // Set the dialog to "edit" mode and fetch the policy by ID
    setDialogMode("create");
    setDialogParam("Create");
    openDialog();
    setEmployeeId("null");
  };

  //UseEffect to check the search params and open the dialog if dialog is closed
  useEffect(() => {
    if (!isDialogOpen) {
      if (getDialogParam === "Update") {
        handleUpdateOpen(Number(getEmployeeId));
      } else if (getDialogParam === "Create") {
        handleCreateOpen();
      }
    }
  }, []);

  const clearDialog = (open: boolean) => {
    setIsDialogOpen(open);
    setDialogParam("null");
    setEmployeeId("null");
    setNameError("");
    setDepartmentError("");
    setEmailError("");
    setDialogMode("create"); // Set the dialog back to "create" mode
  };

  const clearNotesDialog = () => {
    setIsNotesDialogOpen(false);
    setDialogMode("create"); // Set the dialog back to "create" mode
  };

  const clearAmountDialog = () => {
    setIsAmountDialogOpen(false);
    setDialogMode("create"); // Set the dialog back to "create" mode
  };
  //#endregion

  if (employeesError) {
    return <div>Error Loading Employees</div>;
  }

  //
  // if(currentNotesIsLoading){ return <div>Loading Notes...</div>; }
  // if(currentNotesError){ return <div>Error Loading Notes</div>; }
  // if(!notes){ return <div>No Notes</div>; }

  if (currentRolesError) {
    return <div>Error Loading Roles</div>;
  }
  if (!currentRolesIsLoading && !roles) {
    return <div>No Roles</div>;
  }

  if (currentDepartmentsError) {
    return <div>Error Loading Departments</div>;
  }
  if (!currentDepartmentsIsLoading && !departments) {
    return <div>No Departments</div>;
  }

  const addNoteClick = async () => {
    setDialogMode("notes");
    setIsNotesDialogOpen(true);
  };

  const addAmountClick = async () => {
    setDialogMode("amounts");
    setIsAmountDialogOpen(true);
  };

  const handleAddAmount = async (personId: number) => {
    return;
  };
  //#endregion

  return (
    <Card className="min-h-full max-md:border">
        {/* <EmployeesTable
        employeesList={employees}
        onEmployeeClick={handleUpdateOpen}
      /> */}
      <HandleEmployeeContext.Provider value={handleUpdateOpen}>
        <EmpDataTable isLoading={employeesIsLoading} data={employees || []} columns={EmployeesColumns}
                      handleAdd={handleCreateOpen}/>
      </HandleEmployeeContext.Provider>

      <EmployeesDialog
          isDialogOpen={isDialogOpen}
          clearDialog={clearDialog}
          addNoteClick={addNoteClick}
          setNameError={setNameError}
          setEmailError={setEmailError}
          setDepartmentError={setDepartmentError}
          nameError={nameError}
          emailError={emailError}
          departmentError={departmentError}
          departments={departments}
      />
    </Card>
  );
};

export default EmployeesListComponent;
