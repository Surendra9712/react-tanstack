import { ExtraIncentiveForm } from "@/components/Employees/types/ExtraIncentiveForm";
import AdditionAmount from "@/types/AdditionAmount";
import AmountType from "@/types/AmountType";
import CommissionPeriod from "@/types/CommissionPeriod";
import Department from "@/types/Department";
import Employee from "@/types/Employee";
import EmployeeNote from "@/types/EmployeeNote";
import NoteType from "@/types/NoteType";
import PersonSalesPlan from "@/types/PersonSalesPlan";
import Role from "@/types/Role";
import SalesPlan from "@/types/SalesPlan";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { PersonSalesPlanAttribute } from "./IPersonSalesPlanAttribute";
import { PersonSalesPlanForm } from "@/components/Employees/types/PersonSalesPlanForm";

export interface IEmployeeSearchParams {
  id: number | undefined;
}

export interface AdditionalAmountParams {
  id: number | undefined;
  month: number | undefined;
  year: number | undefined;
}

export interface IUseEmployees {
  GetEmployees: () => UseQueryResult<Employee[], Error>;
  GetEmployeeById: (
    args: IEmployeeSearchParams
  ) => UseQueryResult<Employee, Error>;
  GetCurrentProfile: () => UseQueryResult<Employee, Error>;
  GetCurrentProfileImageUrl: () => UseQueryResult<string, Error>;
  CreateEmployee: () => UseMutationResult<any, Error, any, unknown>;
  SetProfileImage: () => UseMutationResult<any, Error, any, unknown>;
  UpdateEmployee: () => UseMutationResult<Boolean, Error, any, unknown>;
  AddNote: () => UseMutationResult<number, Error, any, unknown>;
  DeleteEmployee: () => UseMutationResult<Boolean, Error, any, unknown>;
  ResetEmployee: () => UseMutationResult<any, Error, any, unknown>;
  GetDepartments: () => UseQueryResult<Department[], Error>;
  GetRoles: () => UseQueryResult<Role[], Error>;
  GetSalesPlans: () => UseQueryResult<SalesPlan[], Error>;
  GetPersonSalesPlan: (
    args: IEmployeeSearchParams
  ) => UseQueryResult<PersonSalesPlan, Error>;
  SavePersonSalesPlan: () => UseMutationResult<
    PersonSalesPlanForm,
    Error,
    any,
    unknown
  >;
  GetPersonSalesPlanAttributes: (
    args: IEmployeeSearchParams
  ) => UseQueryResult<PersonSalesPlanAttribute[], Error>;
  SavePersonSalesPlanAttributes: () => UseMutationResult<
    PersonSalesPlanAttribute,
    Error,
    any,
    unknown
  >;
  GetReportsTo: (
    args: IEmployeeSearchParams
  ) => UseQueryResult<Employee, Error>;
  GetManagementGroup: (
    args: IEmployeeSearchParams
  ) => UseQueryResult<Employee[], Error>;
  GetManagers: () => UseQueryResult<Employee[], Error>;
  GetNotesByPersonId: (
    args: IEmployeeSearchParams
  ) => UseQueryResult<EmployeeNote[], Error>;
  GetAmountTypes: () => UseQueryResult<AmountType[], Error>;
  GetCommissionPeriods: () => UseQueryResult<CommissionPeriod[], Error>;
  GetNoteTypes: () => UseQueryResult<NoteType[], Error>;
  GetAdditionalAmounts: (
    args: AdditionalAmountParams
  ) => UseQueryResult<AdditionAmount[], Error>;
  AddExtraIncentive: () => UseMutationResult<
    ExtraIncentiveForm,
    Error,
    any,
    unknown
  >;
}
