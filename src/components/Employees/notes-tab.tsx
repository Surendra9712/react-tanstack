import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import NotesDialog from "./NotesDialog";
import useEmployees from "@/hooks/use-employees";
import useEmployeeSearchParams from "./hooks/use-employee-search-parms";
import Employee from "@/types/Employee";
import EmployeeNote from "@/types/EmployeeNote";
import {useState} from "react";
import {Icons} from "@/components/icons";
import {Badge} from "@/components/ui/badge";
import {toast} from "@/components/ui/use-toast";
import TableSkeleton from "@/components/ui/TableSkeleton";
import {INoteForm} from "@/interfaces/INotesDialog";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import NoteDetailDialog from "@/components/Employees/NoteDetailDialog";

function NotesTab({employee}: { employee: Employee | undefined }) {
    const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
    const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
    const [isNoteDetailDialogOpen, setNoteDetailDialogOpen] = useState(false);
    const {GetNotesByPersonId, GetNoteTypes, AddNote} = useEmployees();
    const [currentNote, setCurrentNote] = useState<EmployeeNote | null>(null);

    const {getEmployeeId} = useEmployeeSearchParams();

    const personId = Number(getEmployeeId);

    const {
        data: notes,
        isLoading: currentNotesIsLoading,
        error: currentNotesError,
        refetch: refetchNotes,
    } = GetNotesByPersonId({id: personId});

    const {
        data: noteTypes,
        isLoading: noteTypesIsLoading,
        error: noteTypesError,
    } = GetNoteTypes();

    const {
        status: statusNote,
        error: errorNote,
        mutate: mutateAddNote,
    } = AddNote();

    const handleAddNote = async (
        formData: INoteForm
    ) => {
        //TODO: move to notes component
        const newNote = {
            ...formData,
            id: 0,
            personId: personId,
            createdBy: null,
        } as EmployeeNote;
        mutateAddNote(newNote, {
            onSuccess: () => {
                refetchNotes();
                toast({message: "Note created successfully"}); // Show success alert
                setIsNotesDialogOpen(false);
            },
            onError: (errorNote: any) => {
                toast({message: "Error creating note. Please try again.", toastType: 'error'});
            },
        });
    };

    if (!getEmployeeId) {
        return (
            <Card className="h-full">
                <CardHeader className="py-0">
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>
                        First create the employee before adding notes.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="border-0 h-full md:space-y-6 space-y-4">
            <CardHeader className='py-0 gap-3 md:flex-row justify-between'>
                <div className="flex-1">
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>
                        Make changes to this employee's notes here.
                    </CardDescription>
                </div>
                <NotesDialog
                    handleAddNote={handleAddNote}
                    isLoading={statusNote === 'pending'}
                    noteTypes={noteTypes!}
                    isNotesDialogOpen={isNotesDialogOpen}
                    onOpenChange={setIsNotesDialogOpen}
                />
            </CardHeader>
            <CardContent className="pt-0">
                <Table>
                    <TableHeader className="sticky top-0">
                        <TableRow className="!border-b-0">
                            <TableHead>Subject</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className='w-10'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentNotesIsLoading ? <TableSkeleton/> : <>{notes?.length ?
                            notes.map((note, index) => (
                                <TableRow className="cursor-pointer" key={note.id} onClick={() => {
                                    setCurrentNote(note);
                                    setNoteDetailDialogOpen(true)
                                }}>
                                    <TableCell className="max-w-[40%] w-full">
                                        <p className="line-clamp-1">{note.subject}</p>
                                    </TableCell>
                                    <TableCell>{note.dateStr}</TableCell>
                                    <TableCell>{note.noteType ?
                                        <Badge translucent={'info'}>{note.dateStr}</Badge> : '-'}</TableCell>
                                    <TableCell>{note.createdBy?.name}</TableCell>
                                    <TableCell className='w-10'>
                                        <Button
                                            size={"icon"}
                                            variant={'translucent'}
                                            shade={'danger'}
                                            className="h-8 w-8"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setRemoveDialogOpen(true)
                                            }}
                                        >
                                            {Icons.trash()}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow className="cursor-pointer">
                                <TableCell colSpan={5} className="text-center">
                                    No Results
                                </TableCell>
                            </TableRow>}</>}
                    </TableBody>
                </Table>
            </CardContent>
            <NoteDetailDialog note={currentNote}
                              isNotesDialogOpen={isNoteDetailDialogOpen}
                              close={() => {
                                  setCurrentNote(null);
                                  setNoteDetailDialogOpen(false)
                              }}/>
            <ConfirmationDialog open={isRemoveDialogOpen}
                                icon={Icons.trash(20, 20)}
                                title={"Remove Note"}
                                subtitle={"Are you sure you want to remove this note?"}
                                message={"Once a note is removed, the action cannot be undone."}
                                close={() => setRemoveDialogOpen(false)}
                                confirm={() => setRemoveDialogOpen(false)}/>
        </Card>
    );
}

export default NotesTab;
