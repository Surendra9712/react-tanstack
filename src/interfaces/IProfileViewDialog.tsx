import Employee from "@/types/Employee";

export interface IProfileViewDialog {
  isProfileViewDialogOpen: boolean;
  clearProfileViewDialog: () => void;
  uploadPhotoClick: () => void;
  profileInfo: Employee;
  profileImageUrl: string;
}