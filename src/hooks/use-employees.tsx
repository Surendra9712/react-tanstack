import { useApi } from "./use-api";
import {
  GETEMPLOYEES_ENDPOINT,
  GETEMPLOYEEBYID_ENDPOINT,
  CREATEEMPLOYEE_ENDPOINT,
  UPDATEEMPLOYEE_ENDPOINT,
  DELETEEMPLOYEE_ENDPOINT,
  GETMANAGEMENTGROUP_ENDPOINT,
  GETMANAGERS_ENDPOINT,
  GETROLES_ENDPOINT,
  GETREPORTSTO_ENDPOINT,
  GETDEPARTMENTS_ENDPOINT,
  GETNOTESBYPERSONID_ENDPOINT,
  GETSALESPLANS_ENDPOINT,
  GETAMOUNTTYPES_ENDPOINT,
  GETCOMMISSIONPERIODSSALES_ENDPOINT,
  GETADDITIONALAMOUNTS_ENDPOINT,
  GETNOTETYPES_ENDPOINT,
  ADDNOTE_ENDPOINT,
  RESET_EMPLOYEE_PASSWORD_ENDPOINT,
  GETCURRENTPROFILE_ENDPOINT,
  GET_PERSON_SALES_PLANS_ENDPOINT as GET_PERSON_SALES_PLAN_ENDPOINT,
  GETCURRENTPROFILEIMAGEURL_ENDPOINT,
  SETPROFILEIMAGE_ENDPOINT,
  ADD_ADDITIONAL_INCENTIVE_ENDPOINT,
  GET_PERSON_SALES_PLAN_ATTRIBUTES_ENDPOINT,
  SAVE_PERSON_SALES_PLAN_ATTRIBUTES_ENDPOINT,
  SAVE_PERSON_SALES_PLANS_ENDPOINT as SAVE_PERSON_SALES_PLAN_ENDPOINT,
} from "../api-config";
import {
  AdditionalAmountParams,
  IEmployeeSearchParams,
  IUseEmployees,
} from "@/interfaces/IUseEmployees";

const validEmployeeId = (args: IEmployeeSearchParams) => {
  if (args.id) return true;
  return false;
};

const validAdditionalAmountParams = (args: AdditionalAmountParams) => {
  if (args.id && args.month && args.year) return true;
  return false;
};

const useEmployees = (): IUseEmployees => {
  const { get: GetEmployees } = useApi({
    endpoint: GETEMPLOYEES_ENDPOINT,
  });
  const { get: GetAmountTypes } = useApi({
    endpoint: GETAMOUNTTYPES_ENDPOINT,
  });
  const { get: GetNoteTypes } = useApi({
    endpoint: GETNOTETYPES_ENDPOINT,
  });
  const { get: GetCommissionPeriods } = useApi({
    endpoint: GETCOMMISSIONPERIODSSALES_ENDPOINT,
  });
  const { get: GetEmployeeById } = useApi({
    endpoint: GETEMPLOYEEBYID_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validEmployeeId,
  });
  const { get: GetCurrentProfile } = useApi({
    endpoint: GETCURRENTPROFILE_ENDPOINT,
  });

  const { get: GetCurrentProfileImageUrl } = useApi({
    endpoint: GETCURRENTPROFILEIMAGEURL_ENDPOINT,
  });
  const { get: GetAdditionalAmounts } = useApi({
    endpoint: GETADDITIONALAMOUNTS_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validAdditionalAmountParams,
  });
  const { post: AddExtraIncentive } = useApi({
    endpoint: ADD_ADDITIONAL_INCENTIVE_ENDPOINT,
  });
  const { post: CreateEmployee } = useApi({
    endpoint: CREATEEMPLOYEE_ENDPOINT,
  });
  const { post: SetProfileImage } = useApi({
    endpoint: SETPROFILEIMAGE_ENDPOINT,
  });
  const { post: UpdateEmployee } = useApi({
    endpoint: UPDATEEMPLOYEE_ENDPOINT,
  });
  const { post: DeleteEmployee } = useApi({
    endpoint: DELETEEMPLOYEE_ENDPOINT,
  });
  const { post: ResetEmployee } = useApi({
    endpoint: RESET_EMPLOYEE_PASSWORD_ENDPOINT,
  });
  const { get: GetDepartments } = useApi({
    endpoint: GETDEPARTMENTS_ENDPOINT,
  });
  const { get: GetRoles } = useApi({
    endpoint: GETROLES_ENDPOINT,
  });
  const { get: GetSalesPlans } = useApi({
    endpoint: GETSALESPLANS_ENDPOINT,
  });
  const { get: GetPersonSalesPlan } = useApi({
    endpoint: GET_PERSON_SALES_PLAN_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validEmployeeId,
  });
  const { post: SavePersonSalesPlan } = useApi({
    endpoint: SAVE_PERSON_SALES_PLAN_ENDPOINT,
  });
  const { get: GetPersonSalesPlanAttributes } = useApi({
    endpoint: GET_PERSON_SALES_PLAN_ATTRIBUTES_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validEmployeeId,
  });
  const { post: SavePersonSalesPlanAttributes } = useApi({
    endpoint: SAVE_PERSON_SALES_PLAN_ATTRIBUTES_ENDPOINT,
  });
  const { get: GetReportsTo } = useApi({
    endpoint: GETREPORTSTO_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validEmployeeId,
  });
  const { get: GetManagementGroup } = useApi({
    endpoint: GETMANAGEMENTGROUP_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validEmployeeId,
  });
  const { get: GetManagers } = useApi({
    endpoint: GETMANAGERS_ENDPOINT,
  });
  const { get: GetNotesByPersonId } = useApi({
    endpoint: GETNOTESBYPERSONID_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validEmployeeId,
  });
  const { post: AddNote } = useApi({
    endpoint: ADDNOTE_ENDPOINT,
  });

  return {
    GetEmployees,
    GetNoteTypes,
    GetCurrentProfile,
    GetCurrentProfileImageUrl,
    SetProfileImage,
    GetManagers,
    AddNote,
    GetAdditionalAmounts,
    AddExtraIncentive,
    GetCommissionPeriods,
    GetAmountTypes,
    GetEmployeeById,
    CreateEmployee,
    UpdateEmployee,
    DeleteEmployee,
    ResetEmployee,
    GetDepartments,
    GetRoles,
    GetReportsTo,
    GetManagementGroup,
    GetNotesByPersonId,
    GetSalesPlans,
    GetPersonSalesPlan,
    SavePersonSalesPlan,
    GetPersonSalesPlanAttributes,
    SavePersonSalesPlanAttributes,
  };
};

export default useEmployees;
