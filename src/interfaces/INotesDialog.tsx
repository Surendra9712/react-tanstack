import Employee from "@/types/Employee";
import NoteType from "@/types/NoteType";
export interface INoteForm{
    subject:string,
    body:string,
    noteType:NoteType
}
export interface INotesDialog {
  isNotesDialogOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  handleAddNote: (
      {
        subject,
        body,
        noteType
      }:INoteForm
  ) => void;
  employee?: Employee;
  noteTypes: NoteType[];
  noteTypeRef?: React.RefObject<HTMLSpanElement>;
  subjectRef?: React.RefObject<HTMLInputElement>;
  bodyRef?: React.RefObject<HTMLTextAreaElement>;
  isLoading?: boolean;
}
