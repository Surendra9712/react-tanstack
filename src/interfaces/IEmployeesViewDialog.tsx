export interface IEmployeesViewDialog {
  isViewDialogOpen: boolean;
  clearViewDialog: () => void;
  viewName: string;
  viewEmail: string;
  viewDepartment: string;
  viewRole: string;
  viewManager: string;
  viewReportsTo: string;
  handleUpdateOpen: () => Promise<void>;
  handleViewNotesOpen: () => Promise<void>;
}