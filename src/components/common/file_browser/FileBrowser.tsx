import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    CollapsibleTrigger,
    CollapsibleContent,
    Collapsible,
} from "@/components/ui/collapsible";
import {DataTable} from "@/components/ui/data-table";

import {Link} from "react-router-dom";
import {
    UserDocument,
    UserDocumentData,
    UserDocumentType,
} from "@/modules/documents/components/document-manager";
import React, {ReactNode, useRef, useState} from "react";
import {UUID} from "crypto";
import {AxiosInstance} from "axios";
import {
    ColumnDef,
    Row,
    RowSelectionState,
    Updater,
} from "@tanstack/react-table";
import {lazy, Suspense} from "react";
import {Icons} from "@/components/icons";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import useDocuments from "@/hooks/use-documents";
import {toast} from "@/components/ui/use-toast";

interface FileBrowserProps {
    documentTree?: UserDocument;
    api: AxiosInstance;
    currentFolder?: UserDocument;
    currentFolderData: UserDocumentData[];
    onDownloadFile?: (fileId: UUID) => void;
    onCreateDirectory?: (directoryName: string, currentFolder?: UUID) => void;
    onDeleteItems?: (UserDocumentData?: UUID[]) => void;
    refreshdocumentList: () => void;
    onCurrentFolderSelect: (folder: UserDocument) => void;
    isReadWrite?: boolean;
    isLoading?: boolean;
    // onUpload?: (file: File) => void;
}

//lady load FileUploadDialog and FileUpload
const FileUploadDialog = lazy(() => import("./FileUploadDialog"));
const CreateDirectoryDialog = lazy(() => import("./CreateDirectory"));

/* eslint-disable react/no-danger */
export default function FileBrowser({
                                        documentTree,
                                        onCreateDirectory,
                                        onDeleteItems,
                                        refreshdocumentList,
                                        onDownloadFile,
                                        onCurrentFolderSelect,
                                        currentFolder,
                                        currentFolderData,
                                        isReadWrite = false,
                                        isLoading
                                    }: FileBrowserProps) {
    const [selectedRows, setSelectedRows] = useState<Row<UserDocumentData>[]>([]);

    // Dialog state
    const [isFileUploadDialogOpen, setIsFileUploadDialogOpen] = useState<boolean>(false);
    const [isFolderCreateDialogOpen, setFolderCreateDialogOpen] = useState<boolean>(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false);

    const {DeleteDirectory} = useDocuments();
    const {status, error, mutate} = DeleteDirectory();
    const cardHeaderRef = useRef(null);
    const emptyId: UUID = "00000000-0000-0000-0000-000000000000";

    const columns: ColumnDef<UserDocumentData>[] = [
        {
            id: "select",
            aggregationFn: 'auto',
            size: 10,
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({row}) => {
                return (
                    <div
                        className="text-body-md flex items-center gap-2 cursor-pointer"
                        onClick={() => handleRowClick(row, "name")}
                    >
                        {row.original.documentType == UserDocumentType.Folder ? (
                            <span className="text-primary">{Icons.folder()}</span>
                        ) : (
                            <span className="text-primary">{Icons.document()}</span>
                        )}
                        <span> {row.getValue("name")}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "modified",
            header: "Modified Date",
            cell: ({row}) => {
                const dateTime = row.getValue("modified") as ReactNode;
                return <div className="text-body-md">{dateTime ?? ""}</div>;
            },
        },
        {
            accessorKey: "size",
            header: "File Size",
            cell: ({row}) => {
                var sz = row.getValue("size") as number;
                return <div className="text-body-md">{sz ? (sz / 1024).toFixed(0) + "KB" : ""}</div>;
            },
        },
    ];

    const handleRowClick = (row: Row<UserDocumentData>, column: string) => {
        var id = row.original.id;
        if (row.original.documentType == UserDocumentType.File) {
            if (onDownloadFile && id != null) onDownloadFile(id);
        } else {
            var fol = null;
            currentFolder?.documents?.map((m) => {
                if (m.id == id) fol = m;
            });
            if (fol != null) onCurrentFolderSelect(fol);
        }
    };

    function onRowSelectionChange(
        table: import("@tanstack/table-core").Table<UserDocumentData>,
        rowSelection: Updater<RowSelectionState>
    ) {
        setSelectedRows(table.getFilteredSelectedRowModel().rows);
    }

    function isFolderOpen(doc: UserDocument, checkDoc?: UserDocument): boolean {
        if (doc.id == emptyId) return true;
        if (checkDoc == null) return false;
        if (checkDoc == doc) return true;
        if (checkDoc.parent != null) return isFolderOpen(doc, checkDoc.parent);
        return false;
    }

    function Getparents(doc: UserDocument): UserDocument[] {
        var array: UserDocument[] = [];
        var cur = doc;
        array.push(cur);
        while (cur.parent != null) {
            cur = cur.parent;
            if (cur != null) array.splice(0, 0, cur);
        }
        return array.length > 3 ? array.slice(-3) : array;
    }

    function buildDocument(doc?: UserDocument) {
        if (doc?.parent == null) {
            // console.log(doc);
        }
        return doc ? (
            <Collapsible
                key={doc.id}
                open={isFolderOpen(doc, currentFolder)}
            >
                <CollapsibleTrigger onClick={() => onCurrentFolderSelect(doc)}
                                    className={`mb-1 flex w-full gap-2 p-2 items-center rounded  transition-all ${isFolderOpen(doc, currentFolder) ? 'bg-primary-translucent' : 'hover:bg-surface-300'}`}>
                    {isFolderOpen(doc, currentFolder) ? (
                        <span className="text-primary">{Icons.folderOpen()}</span>
                    ) : (
                        <span className="text-primary">{Icons.folder()}</span>
                    )}
                    <Label size={'md'}
                           className="font-medium text-left cursor-pointer line-clamp-1">{doc.display}</Label>
                </CollapsibleTrigger>
                {doc.documents != null && doc.documents.length > 0 ? (
                    <nav className="grid items-start pl-2.5">
                        <CollapsibleContent>
                            {doc.documents
                                .filter((f) => f.documentType === UserDocumentType.Folder)
                                .map((m) => buildDocument(m))}
                        </CollapsibleContent>
                    </nav>
                ) : (
                    <></>
                )}
            </Collapsible>
        ) : (
            <></>
        );
    }

    const handleDelete = () => {
        const itemList = selectedRows.map(f => f.original.id as UUID);
        mutate(itemList, {
            onSuccess: () => {
                refreshdocumentList();
                toast({message: "Directory/document deleted successfully."});
            },
            onError: (errorCreate: any) => {
                toast({message: "Error deleting directory/document. Please try again.", toastType: 'error'});
            },
        });
        setConfirmationDialogOpen(false);
    }

    const getHeight = () => {
        let defaultHeight = 124;
        if (window.innerWidth < 768) {
            defaultHeight = 108;
        }
        if (cardHeaderRef.current) {
            const element = cardHeaderRef.current as HTMLElement
            const {clientWidth: width, clientHeight: height} = element;
            defaultHeight += height;
        }
        return defaultHeight;
    }

    return (
        <div className="lg:grid h-full lg:grid-cols-[256px_1fr] gap-x-4 xl:gap-6 ">
            <Card className="lg:block hidden">
                <CardHeader className="md:px-2">
                    <CardTitle>Folders</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 max-h-[calc(100vh-180px)] tiny-scrollbar overflow-auto md:px-2 py-0">
                    {buildDocument(documentTree)}
                </CardContent>
            </Card>
            <Card className='h-full max-md:border'>
                <CardHeader ref={cardHeaderRef} className="flex lg:flex-row justify-between gap-3">
                    <div>
                        <CardTitle className="line-clamp-1 break-all h-7">{currentFolder?.display}</CardTitle>
                        <div className="flex flex-1 lg:hidden items-center gap-2 overflow-x-auto no-scrollbar">
                            {currentFolder && Getparents(currentFolder).length > 1 && (
                                Getparents(currentFolder).map((m, idx) => (
                                    <div key={m.id} className="flex items-center gap-2 text-200 last:text-100">
                                        {idx > 0 ? <span className="text-200">{Icons.chevronRight()}</span> : <></>}
                                        <Link className="text-body-sm whitespace-nowrap py-2"
                                              onClick={() => onCurrentFolderSelect(m)}
                                              to="#">
                                            {m.display}
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {isReadWrite === true && (
                            <div className="flex gap-3 lg:justify-end">
                                <DropdownMenu>
                                    <div>
                                        <DropdownMenuTrigger asChild>
                                            <div
                                                className="flex items-center gap-2 text-white bg-primary  cursor-pointer rounded py-2 px-4 max-[390px]:px-2">
                                                {Icons.plus(20, 20)}
                                                <Label weight="medium" className="cursor-pointer line-clamp-1">Add
                                                    New</Label>
                                                {Icons.chevronDown(20, 20)}
                                            </div>
                                        </DropdownMenuTrigger>
                                    </div>
                                    <DropdownMenuContent align="end" className="py-2 px-0 min-w-48">
                                        <DropdownMenuItem onClick={() => setIsFileUploadDialogOpen(true)}>
                                            <span className="text-primary">{Icons.cloudArrowUp(20, 20)}</span>
                                            <Label size='md' className='cursor-pointer font-medium'>File Upload</Label>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFolderCreateDialogOpen(true)}>
                                            <span className="text-primary">{Icons.folderAdd(20, 20)}</span>
                                            <Label size='md' className='cursor-pointer font-medium'>New Folder</Label>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FileUploadDialog
                                    isOpen={isFileUploadDialogOpen}
                                    triggerOpen={setIsFileUploadDialogOpen}
                                    folder={currentFolder}
                                    onUpload={(e) => {
                                        if (e) {
                                            setIsFileUploadDialogOpen(false);
                                            refreshdocumentList()
                                        }
                                    }}
                                >
                                </FileUploadDialog>
                                <CreateDirectoryDialog
                                    className="gap-4"
                                    currentFolder={currentFolder?.id}
                                    isOpen={isFolderCreateDialogOpen}
                                    cancel={() => setFolderCreateDialogOpen(false)}
                                    onSubmit={() => {
                                        setFolderCreateDialogOpen(false);
                                        refreshdocumentList()
                                    }}
                                />
                                <Button
                                    isLoading={status === 'pending'}
                                    variant={'translucent'}
                                    shade={'danger'}
                                    className='whitespace-nowrap max-[390px]:px-2'
                                    onClick={() => setConfirmationDialogOpen(true)}
                                    disabled={!(selectedRows && selectedRows.length > 0)}>
                                    {Icons.trash(20, 20)}
                                    {"Remove (" + selectedRows.length + ")"}
                                </Button>
                                <ConfirmationDialog open={isConfirmationDialogOpen}
                                                    icon={Icons.trash(20, 20)}
                                                    title={"Remove File"}
                                                    subtitle={"Are you sure you want to remove selected file(s)?"}
                                                    message={"Once a file is removed, the action cannot be undone."}
                                                    close={() => setConfirmationDialogOpen(false)}
                                                    confirm={handleDelete}/>
                            </div>
                         )}
                    </Suspense>
                </CardHeader>
                <CardContent
                    className="pt-0">
                    <DataTable
                        style={{maxHeight: `calc(100vh - ${getHeight()}px`}}
                        columns={columns}
                        isLoading={isLoading}
                        data={currentFolderData}
                        onRowSelection={(table, e) => onRowSelectionChange(table, e)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}