import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter, DialogTitle,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {useEffect, useRef} from "react";
import {CreateDirectoryDialogProps} from "@/interfaces/ICreateDirectoryDialog";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import {useForm} from "@tanstack/react-form";
import FieldError from "@/components/ui/field-error";
import useDocuments from "@/hooks/use-documents";
import {UserDocument} from "@/modules/documents/components/document-manager";
import {toast} from "@/components/ui/use-toast";

function CreateDirectoryDialog({
                                   currentFolder,
                                   onSubmit,
                                   isOpen,
                                   cancel
                               }: CreateDirectoryDialogProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const {CreateDirectory} = useDocuments();

    const {
        status: statusCreate,
        error: errorCreate,
        mutate: mutateCreate
    } = CreateDirectory();

    const form = useForm({defaultValues: {name: ''},
    onSubmit:async ({value}) =>{
        const newFolder: UserDocument = {
            ...value,
            id: currentFolder,
            display: value.name,
        };
        mutateCreate(newFolder, {
            onSuccess: () => {
                toast({message: "Directory created successfully."});
                onSubmit();
            },
            onError: (errorCreate: any) => {
                toast({message: "Error creating directory. Please try again.", toastType: 'error'});
            },
        });
    }});

    useEffect(() => {
        setTimeout(() => {
            if (isOpen && inputRef.current) {
                inputRef.current.focus();
            }
        }, 10)
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={cancel}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.addCircle(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Add Folder</DialogTitle>
                    </div>
                </DialogHeader>
                <form onSubmit={(e) =>{
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit()
                }}>
                    <div className="md:p-6 p-4 pb-6">
                        <div className="relative space-y-1">
                            <form.Field
                                name="name"
                                defaultValue={''}
                                validators={{
                                    onChange: ({value}) =>
                                        !value ? 'Directory name is required'
                                            : undefined,
                                }}
                                children={(field) => {
                                    return (
                                        <>
                                            <Label weight="medium" htmlFor={field.name}>Directory Name</Label>
                                            <Input
                                                ref={inputRef}
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                placeholder="Enter directory name"
                                                data-error={field.getMeta().errors.length > 0}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldError field={field}/>
                                        </>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type={'reset'}
                            onClick={cancel}
                            variant={'outline'}
                            shade={'gray'}>
                            Cancel
                        </Button>
                        <Button isLoading={statusCreate === 'pending'} type={'submit'}>
                            Add
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
}

export default CreateDirectoryDialog;
