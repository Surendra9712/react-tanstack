import React from "react";
import {IPolicyDialog} from "@/interfaces/IPolicyDialog";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogTitle,
} from "../ui/dialog";
import {Input} from "../ui/input";
import RichTextEditor from "../common/RichTextEditor";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import {useForm} from "@tanstack/react-form";
import FieldError from "@/components/ui/field-error";
import usePolicy from "@/hooks/use-policy";
import {toast} from "@/components/ui/use-toast";

const PolicyDialog: React.FC<IPolicyDialog> = ({
                                                   isDialogOpen,
                                                   clearDialog,
                                                   handleDialogSubmit,
                                                   tempPolicy,
    category
                                               }) => {
        const {
            CreatePolicy,
            UpdatePolicy
        } = usePolicy();

        const {
            status: statusCreate,
            error: errorCreate,
            mutate: mutateCreate,
        } = CreatePolicy();
    const {
        status: statusUpdate,
        error: errorUpdate,
        mutate: mutateUpdate,
    } = UpdatePolicy();
        const form = useForm({
            defaultValues: {
                title: tempPolicy?.title || '',
                content: tempPolicy?.content || '',
            },
            onSubmit: async ({value}) => {
                const formData = {...value, category: {id: category?.id,category:category?.category}};
                if (tempPolicy?.id) {
                    const updateData = {...value, category: {id: category?.id,category:category?.category},id:tempPolicy.id};
                    mutateUpdate(
                        updateData,
                        {
                            onSuccess: () => {
                                handleDialogSubmit(); //refresh policies list
                                toast({message: "Policy updated successfully."});
                            },
                            onError: (errorCreate: any) => {
                                toast({message: "Error updating policy. Please try again.", toastType: 'error'});
                            },
                        }
                    );
                } else {
                    mutateCreate(formData, {
                        onSuccess: () => {
                            handleDialogSubmit(); //refresh policies list
                            toast({message: "Policy created successfully."});
                        },
                        onError: (errorCreate: any) => {
                            toast({message: "Error creating policy. Please try again.", toastType: 'error'});
                        },
                    });
                }
            }
        });

        return (
            <>
                <Dialog open={isDialogOpen} onOpenChange={clearDialog}>
                    <DialogContent className="gap-0 p-0 max-w-[1000px]">
                        <DialogHeader>
                            <div className="flex gap-4 items-center">
                                <div>
                                    <CircularIcon>{tempPolicy ? Icons.pen(20, 20) : Icons.addCircle(20, 20)}</CircularIcon>
                                </div>
                                <DialogTitle>{tempPolicy ? "Edit Policy" : "Add Policy"}</DialogTitle>
                            </div>
                        </DialogHeader>
                        <form className="" onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation();
                            form.handleSubmit()
                        }}>
                            <div className="flex flex-col gap-4 py-6 px-4 max-h-[calc(100vh-180px)] overflow-y-auto tiny-scrollbar">
                                <div className="relative space-y-1">
                                    <form.Field
                                        name="title"
                                        defaultValue={tempPolicy?.title}
                                        validators={{
                                            onChange: ({value}) =>
                                                !value ? 'Title is required'
                                                    : undefined,
                                        }}
                                        children={(field) => {
                                            return (
                                                <>
                                                    <Label weight="medium" htmlFor={field.name}>Title</Label>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        placeholder="Enter title"
                                                        data-error={field.getMeta().errors.length > 0}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    <FieldError field={field}/>
                                                </>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <form.Field
                                        name={"content"}
                                        defaultValue={tempPolicy?.content}
                                        validators={{
                                            onChange: ({value}) =>
                                                !value || value === '<p><br></p>' ? 'Body is required'
                                                    : undefined,
                                        }}
                                        children={(field) => {
                                            return (
                                                <>
                                                    <Label weight="medium" htmlFor={field.name}>Body</Label>
                                                    <RichTextEditor
                                                        className={`mt-1 ${field.state.meta.errors.length ? 'border-danger-200' : 'border-200'}`}
                                                        defaultValue={field.state.value}
                                                        onChange={(e) => field.handleChange(e)}
                                                    />
                                                    <FieldError field={field}/>
                                                </>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type={'reset'} onClick={clearDialog} variant={'outline'} shade={'gray'}>
                                    Cancel
                                </Button>
                                <Button isLoading={statusCreate === 'pending'|| statusUpdate === 'pending'}>
                                    {tempPolicy ? "Save" : "Add"}
                                </Button>
                            </DialogFooter>
                        </form>

                    </DialogContent>
                </Dialog>
            </>
        );
    }
;

export default PolicyDialog;
