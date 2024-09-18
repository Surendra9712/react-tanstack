export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Auth
export const LOGIN_ENDPOINT = "api/auth/login";

//Policy
export const GETPOLICIES_ENDPOINT = "PolicyController/GetPolicies";
export const GETCATEGORIES_ENDPOINT = "PolicyController/GetCategories";
export const GETPOLICYBYID_ENDPOINT = "PolicyController/GetPolicyById";
export const GETRECENTPOLICIES_ENDPOINT = "PolicyController/GetRecentPolicies";
export const CREATEPOLICY_ENDPOINT = "PolicyController/CreatePolicy";
export const UPDATEPOLICY_ENDPOINT = "PolicyController/UpdatePolicy";
export const DELETEPOLICY_ENDPOINT = "PolicyController/DeletePolicy";

//SalesLog
export const GETALLSALES_ENDPOINT = "SalesController/GetAllSales";
export const GET_RECENT_SALES_ENDPOINT = "SalesController/GetRecentSales";
export const GETSALESPRODUCTS_ENDPOINT = "SalesController/GetSalesProducts";
export const GETSALEPRODUCTS_ENDPOINT = "SalesController/GetSaleProducts";
export const GETSALESPERIODS_ENDPOINT = "SalesController/GetSalesPeriods";
export const GETSALEBYID_ENDPOINT = "SalesController/GetSaleById";
export const CREATESALE_ENDPOINT = "SalesController/CreateSale";
export const UPDATESALE_ENDPOINT = "SalesController/UpdateSale";
export const ADDSALEPRODUCT_ENDPOINT = "SalesController/AddSaleProduct";
export const DELETESALEPRODUCT_ENDPOINT = "SalesController/DeleteSaleProduct";
export const DELETESALE_ENDPOINT = "SalesController/DeleteSale";

//Commission
export const GETCOMMISSIONS_ENDPOINT = "CommissionController/GetCommissions";
export const GET_RECENT_COMMISSIONS_ENDPOINT = "CommissionController/GetRecentCommissions";
export const GETCOMMISSIONINFO_ENDPOINT = "CommissionController/GetCommissionInfo";
export const GETCOMMISSIONPERIODS_ENDPOINT = "CommissionController/GetCommissionPeriods";
export const GETCOMMISSIONBYID_ENDPOINT = "CommissionController/GetCommissionById";
export const CREATECOMMISSION_ENDPOINT = "CommissionController/CreateCommission";
export const UPDATECOMMISSION_ENDPOINT = "CommissionController/UpdateCommission";
export const DELETECOMMISSION_ENDPOINT = "CommissionController/DeleteCommission";
export const CALC_COMMISSION_BY_PLAN_ENDPOINT = "CommissionController/CalculateCommissionBySalePlan";
export const CALC_COMMISSION_BY_PERSON_ENDPOINT = "CommissionController/CalculateCommission";

//Employees
const EmployeeController = "EmployeesController/";
export const GETEMPLOYEES_ENDPOINT = `${EmployeeController}GetEmployees`;
export const GETAMOUNTTYPES_ENDPOINT = `${EmployeeController}GetAmountTypes`;
export const GETNOTETYPES_ENDPOINT = `${EmployeeController}GetNoteTypes`;
export const GETADDITIONALAMOUNTS_ENDPOINT = `${EmployeeController}GetAdditionalAmounts`;
export const ADD_ADDITIONAL_INCENTIVE_ENDPOINT = `${EmployeeController}AddAdditionalIncentive`;
export const GETCOMMISSIONPERIODSSALES_ENDPOINT = `${EmployeeController}GetCommissionPeriods`;
export const GETEMPLOYEEBYID_ENDPOINT = `${EmployeeController}GetEmployeeById`;
export const GETCURRENTPROFILE_ENDPOINT = `${EmployeeController}GetCurrentProfile`;
export const CREATEEMPLOYEE_ENDPOINT = `${EmployeeController}CreateEmployee`;
export const UPDATEEMPLOYEE_ENDPOINT = `${EmployeeController}UpdateEmployee`;
export const DELETEEMPLOYEE_ENDPOINT = `${EmployeeController}DeleteEmployees`;
export const RESET_EMPLOYEE_PASSWORD_ENDPOINT = `${EmployeeController}ResetEmployee`;
export const GETMANAGEMENTGROUP_ENDPOINT = `${EmployeeController}GetManagementGroup`;
export const GETMANAGERS_ENDPOINT = `${EmployeeController}GetManagers`;
export const GETROLES_ENDPOINT = `${EmployeeController}GetRoles`;
export const GETSALESPLANS_ENDPOINT = `${EmployeeController}GetSalesPlans`;
export const GET_PERSON_SALES_PLANS_ENDPOINT = `${EmployeeController}GetPersonSalesPlans`;
export const SAVE_PERSON_SALES_PLANS_ENDPOINT = `${EmployeeController}SavePersonSalesPlans`;
export const GET_PERSON_SALES_PLAN_ATTRIBUTES_ENDPOINT = `${EmployeeController}GetPersonSalesPlanAttributes`;
export const SAVE_PERSON_SALES_PLAN_ATTRIBUTES_ENDPOINT = `${EmployeeController}AddPersonSalesPlanAttributes`;
export const GETREPORTSTO_ENDPOINT = `${EmployeeController}GetReportsTo`;
export const GETDEPARTMENTS_ENDPOINT = `${EmployeeController}GetDepartments`;
export const GETNOTESBYPERSONID_ENDPOINT = `${EmployeeController}GetNotes`;
export const ADDNOTE_ENDPOINT = `${EmployeeController}SaveNote`;
export const GETCURRENTPROFILEIMAGEURL_ENDPOINT = `${EmployeeController}GetCurrentProfileImageUrl`;
export const SETPROFILEIMAGE_ENDPOINT = `${EmployeeController}SetProfileImage`;

//Sales Plan
export const GETSALESPLANSMAIN_ENDPOINT = "SalesPlanController/GetSalesPlans";
export const GETPARTICIPANTS_ENDPOINT = "SalesPlanController/GetParticipants";
export const DELETEPLANPARTICIPANT_ENDPOINT = "SalesPlanController/DeletePlanParticipant";
export const ADD_PARTICIPANT_ENDPOINT = "SalesPlanController/AddParticipant";
export const GETELLIGABLEPARTICIPANTS_ENDPOINT = "SalesPlanController/GetElligableParticipants";
export const GETPLANTYPES_ENDPOINT = "SalesPlanController/GetAllLogicApps";
export const UPDATESALESPLAN_ENDPOINT = "SalesPlanController/UpdateSalesPlan";
export const SAVEPARTICIPANTS_ENDPOINT = "SalesPlanController/SaveParticipants";
export const CREATENEWFROM_ENDPOINT = "SalesPlanController/CreateNewFrom";

//Documents
export const DOCS_ENDPOINT = "Documents";
export const GET_RECENT_DOCUMENTS_ENDPOINT = `${DOCS_ENDPOINT}/GetRecentDocuments`;
export const GET_DIRECTORY_ENDPOINT = `${DOCS_ENDPOINT}/GetDirectory`;
export const CREATE_DIRECTORY_ENDPOINT = `${DOCS_ENDPOINT}/CreateDirectory`;
export const DELETE_DIRECTORY_ENDPOINT = `${DOCS_ENDPOINT}/DeleteItems`;