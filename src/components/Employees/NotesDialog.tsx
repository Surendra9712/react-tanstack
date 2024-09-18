import React from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader, DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {INotesDialog} from "@/interfaces/INotesDialog";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import useEmployees from "@/hooks/use-employees";
import {Icons} from "@/components/icons";
import {CircularIcon} from "@/components/ui/icon";
import {useForm} from "@tanstack/react-form";
import FieldError from "@/components/ui/field-error";
import {isNullOrUndefinedOrEmpty} from "@/lib/utils";

const NotesDialog: React.FC<INotesDialog> = ({
                                                 handleAddNote,
                                                 isLoading,
                                                 employee,
                                                 isNotesDialogOpen,
                                                 onOpenChange,
                                             }) => {

    const {GetNoteTypes} = useEmployees();

    const {
        data: noteTypes,
        isLoading: noteTypesIsLoading,
        error: noteTypesError,
    } = GetNoteTypes();

    const today = new Date();
    const currentDateStr = `${
        today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    const form = useForm({
        defaultValues: {
            date: today,
            dateStr: today.toLocaleDateString(),
            subject: "",
            body: "",
            noteType: {id: 0, name: ""}
        }, onSubmit: async ({value}) => {
            handleAddNote(value);
        },
    });

    return (
        <Dialog open={isNotesDialogOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild={true}>
                <Button type="button" className="whitespace-nowrap w-fit" size={'sm'}>
                    {Icons.plus()}
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px]">
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.addCircle(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Add Note</DialogTitle>
                    </div>
                </DialogHeader>
                <Card className="border-0">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}>
                        <CardContent className="md:p-6 p-4 space-y-4">
                            <div className="relative">
                                <form.Field
                                    name="subject"
                                    defaultValue={''}
                                    validators={{
                                        onChange: ({value}) =>
                                            !value ? 'Subject is required'
                                                : undefined,
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <Label weight="medium" htmlFor={field.name}>Subject</Label>
                                                <Input
                                                    data-error={field.getMeta().errors.length>0}
                                                    className={`mt-1`}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    placeholder="Enter your subject"
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
                                    name="body"
                                    defaultValue={''}
                                    validators={{
                                        onChange: ({value}) =>
                                            !value ? 'Content is required'
                                                : undefined,
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <Label weight="medium" htmlFor={field.name}>Content</Label>
                                                <Textarea
                                                    className={`mt-1`}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    data-error={field.getMeta().errors.length>0}
                                                    placeholder="Enter your content"
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
                                    name="noteType.name"
                                    defaultValue={''}
                                    validators={{
                                        onChange: ({value}) =>
                                            isNullOrUndefinedOrEmpty(value) ? 'Type is required'
                                                : undefined,
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <Label weight="medium" htmlFor={field.name}>Type</Label>
                                                <Select onValueChange={(value) => {
                                                    const type = noteTypes?.find(note => note.name === value);
                                                    if (type) {
                                                        form.setFieldValue('noteType.id', type.id)
                                                    }
                                                    field.handleChange(value)
                                                }}
                                                        name={field.name}
                                                        value={field.state.value}>
                                                    <SelectTrigger
                                                        className={`mt-1 ${field.state.meta.errors.length ? "border-danger-200" : ""}`}>
                                                        <SelectValue placeholder="Select note type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {noteTypes &&
                                                            noteTypes!.map((product) => (
                                                                <SelectItem
                                                                    key={product.id}
                                                                    value={product.name.toString()}
                                                                >
                                                                    {product.name}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                                <FieldError field={field}/>
                                            </>
                                        )
                                    }}
                                />
                            </div>
                            <div>
                                <Label weight="medium">Date</Label>
                                <Input
                                    className={'mt-1'}
                                    id="date"
                                    name="date"
                                    value={currentDateStr}
                                    disabled
                                />
                            </div>
                        </CardContent>
                        <DialogFooter className="justify-end gap-4 border-t">
                            <Button
                                variant={'outline'}
                                shade={'gray'}
                                onClick={() => onOpenChange && onOpenChange(false)}>
                                Cancel
                            </Button>
                            <form.Subscribe
                                children={() => (
                                    <Button type="submit" isLoading={isLoading}>
                                        Add
                                    </Button>
                                )}
                            />
                        </DialogFooter>
                    </form>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default NotesDialog;
