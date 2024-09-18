export interface UserInfo {
  PersonId: number;
  Roles?: string[]; // Optional and can be an array of strings or undefined
  RoleIds?: string[]; // Optional and can be an array of strings or undefined
  ManagerId?: number | null; // Can be number, null, or omitted
  DepartmentId?: number | null; // Can be number, null, or omitted
  NumberOfReportees?: number;
}
