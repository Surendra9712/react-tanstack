import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {FileUploadDialogProps} from "@/interfaces/IFileUploadDialog";
import React from "react";
import {Icons} from "@/components/icons";
import FileUpload from "@/components/common/file_upload/file-upload";
import useAxios from "@/hooks/use-axios";
import {CircularIcon} from "@/components/ui/icon";

function FileUploadDialog({
                              onUpload,
                              folder,
                              isOpen,
                              triggerOpen,
                          }: FileUploadDialogProps) {

    const apiUrl = "Documents/CreateFile";
    const api = useAxios(true);

    return (
        <Dialog open={isOpen} onOpenChange={triggerOpen}>
            <DialogContent className="max-w-[800px]">
                <DialogHeader className="mb-6">
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.addCircle(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Add File</DialogTitle>
                    </div>
                </DialogHeader>
                <FileUpload
                    apiUrl={apiUrl}
                    folderId={folder?.id}
                    api={api}
                    cancel={() =>triggerOpen(false)}
                    onUpload={onUpload}
                />
            </DialogContent>
        </Dialog>
    );
}

export default FileUploadDialog;
