import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
    Card,
} from "@/components/ui/card";
import {Icons} from "@/components/icons";
import {CircularIcon} from "@/components/ui/icon";
import EmployeeNote from "@/types/EmployeeNote";
import {Badge} from "@/components/ui/badge";
import {Title} from "@/components/ui/title";
import {ContentBody} from "@/components/ui/contentBody";

export interface INotesProps {
    note: EmployeeNote | null,
    isNotesDialogOpen: boolean,
    close: () => void
}

const NoteDetailDialog: React.FC<INotesProps> = ({
                                                     note,
                                                     isNotesDialogOpen,
                                                     close
                                                 }) => {
    return (
        <Dialog open={isNotesDialogOpen} onOpenChange={close}>
            <DialogContent className="max-w-[500px]">
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.note(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Note</DialogTitle>
                    </div>
                </DialogHeader>
                <Card className="md:p-6 p-4">
                    <div className="space-y-1 mb-4">
                        {note?.noteType && <Badge className="mb-1">{note?.noteType.name}</Badge>}
                        <Title>{note?.subject}</Title>
                        <div className="flex gap-2">
                            <ContentBody size={'sm'} className="flex  items-center">{Icons.calendar()} {note?.dateStr}</ContentBody>
                            <ContentBody size={'sm'}
                                         className="flex  items-center">{Icons.person()} {note?.createdBy?.name}</ContentBody>
                        </div>
                    </div>
                    <ContentBody className="break-all" size={'lg'}>{note?.body}</ContentBody>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default NoteDetailDialog;
