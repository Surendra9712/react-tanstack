import React, { useState } from "react";
import { IEmployeesDialog } from "@/interfaces/IEmployeesDialog";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmployees from "@/hooks/use-employees";
import Employee from "@/types/Employee";
import useAlert from "@/hooks/use-alert";
import useEmployeeSearchParams from "./hooks/use-employee-search-parms";
import NotesTab from "./notes-tab";
import SalesPlanTab from "./sales-plan-tab";
import CommissionParametersTab from "./commission-params-tab";
import CommissionPeriod from "@/types/CommissionPeriod";
import ProfileTab from "./profile-tab/profile-tab";
import ProfileTabSkeleton from "./profile-tab/profile-tab-skeleton";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";

const EmployeesDialog: React.FC<IEmployeesDialog> = ({
  isDialogOpen,
  clearDialog,
  addNoteClick,
  setNameError,
  setEmailError,
  setDepartmentError,
  nameError,
  emailError,
  departmentError,
  departments,
}) => {
  const [activeTab, setActiveTab] = useState("profile");

  const alert = useAlert();

  const { getDialogParam, getEmployeeId } = useEmployeeSearchParams();

  const employeeId = Number(getEmployeeId) || undefined;

  //error messages?
  const [reportsToError, setReportsToError] = useState<string>("");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const {
    GetEmployeeById,
    GetRoles,
    GetReportsTo,
    GetManagementGroup,
    GetCommissionPeriods,
  } = useEmployees();

  const { data: employeeData, isLoading: employeeLoading } = GetEmployeeById({
    id: employeeId,
  });

  const {
    data: roles,
    isLoading: currentRolesIsLoading,
    error: currentRolesError,
  } = GetRoles();

  const {
    data: commissionPeriods,
    isLoading: commissionPeriodsIsLoading,
    error: commissionPeriodsError,
  } = GetCommissionPeriods();

  const {
    data: managementGroup,
    isLoading: currentManagementGroupIsLoading,
    error: currentManagementGroupError,
  } = GetManagementGroup({ id: employeeId });

  const { data: reportsToData, isLoading: isLoadingReportsTo } = GetReportsTo({
    id: employeeId,
  });

  const [currentEmployee, setCurrentEmployee] = useState<Employee | undefined>(
    employeeData
  );

  const [selectedCommPeriod, setSelectedCommPeriod] = useState<
    CommissionPeriod | undefined
  >();

  const isProfileTabLoading =
    employeeLoading ||
    currentRolesIsLoading ||
    isLoadingReportsTo ||
    currentManagementGroupIsLoading;

  return (
    <Dialog open={isDialogOpen} onOpenChange={clearDialog}>

      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <div className="flex gap-4 items-center">
            <div>
              <CircularIcon>{employeeData ? Icons.pen(20, 20) : Icons.addCircle(20, 20)}</CircularIcon>
            </div>
            <DialogTitle>{employeeData ? "Edit Employee Details" : "Add Employee Details"}</DialogTitle>
          </div>
        </DialogHeader>
        <Tabs
            defaultValue="profile"
            value={activeTab}
            onValueChange={setActiveTab}
            className="overflow-x-auto md:pt-6 pt-4 md:space-y-6 space-y-4"
        >
             <div className="mx-4 md:mx-6 overflow-x-auto no-scrollbar">
               <TabsList className="grid justify-start md:grid-cols-4 grid-cols-[auto,auto,auto,auto] max-md:gap-3 max-md:bg-transparent max-md:p-0 max-md:h-8">
                 <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary" value="profile">Profile</TabsTrigger>
                 <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary" value="notes">Notes</TabsTrigger>
                 <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary" value="salesPlan">Sales Plan</TabsTrigger>
                 <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary" value="commissionParameters">
                   Commission Parameters
                 </TabsTrigger>
               </TabsList>
             </div>
          <TabsContent value="profile">
            {isProfileTabLoading && <ProfileTabSkeleton />}
            {!isProfileTabLoading && (
              <ProfileTab
                employeeData={employeeData}
                reportsToData={reportsToData}
                roles={roles}
                departments={departments}
                managementGroup={managementGroup}
              />
            )}
          </TabsContent>
          <TabsContent value="notes"  className="h-[calc(100vh-300px)] overflow-y-auto tiny-scrollbar">
            <NotesTab employee={currentEmployee} />
          </TabsContent>
          <TabsContent value="salesPlan" className="h-[calc(100vh-300px)] overflow-y-auto tiny-scrollbar">
            <SalesPlanTab />
          </TabsContent>
          <TabsContent value="commissionParameters">
            <CommissionParametersTab
              commissionPeriods={commissionPeriods}
              selectedCommPeriod={selectedCommPeriod}
              setSelectedCommPeriod={setSelectedCommPeriod}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeesDialog;
