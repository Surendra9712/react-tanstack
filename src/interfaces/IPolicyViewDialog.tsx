import Policy from "@/types/Policy";

export interface IPolicyViewDialog {
  isViewDialogOpen: boolean;
  clearViewDialog: () => void;
  viewTitle: string;
  viewCategory: string;
  viewBody: string;
  handleUpdateOpen?: () => Promise<void>;
  handleDeletePolicy?: (policy: number) => Promise<void>;
  tempPolicy: Policy | null;
  currentPolicy: Policy|undefined;
}