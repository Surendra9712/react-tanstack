import { UUID } from "crypto";

export interface CreateDirectoryDialogProps {
  isOpen: boolean;
  cancel: () =>void;
  className?: string;
  buttonLabel?: string;
  currentFolder?: UUID;
  onSubmit: () => void;
}