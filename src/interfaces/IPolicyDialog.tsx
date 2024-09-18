import Policy from "@/types/Policy";
import PolicyCategory from "@/types/PolicyCategory";

export interface IPolicyDialog {
  isDialogOpen: boolean;
  clearDialog: () => void;
  handleDialogSubmit: () => void;
  tempPolicy: Policy | null;
  handleQuillChange?: () => void;
  categories?: PolicyCategory[];
  category?: PolicyCategory;
}
