import {UserDocument} from "@/modules/documents/components/document-manager";

export interface FileUploadDialogProps {
  onUpload: (success:boolean)=> void;
  isOpen?: boolean;
  triggerOpen: (open: boolean) => void;
  folder: UserDocument|undefined;
}
