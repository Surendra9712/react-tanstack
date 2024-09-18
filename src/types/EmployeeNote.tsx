import NoteType from "./NoteType";
import Person from "./Person";

interface EmployeeNote {
  id: number;
  personId: number | null;
  subject: string;
  body: string;
  date: Date;
  dateStr: string;
  noteType: NoteType;
  createdBy: Person | null;
}

export default EmployeeNote;
