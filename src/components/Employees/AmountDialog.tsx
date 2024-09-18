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
} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {IAmountDialog} from "@/interfaces/IAmountDialog";
import {Input} from "@/components/ui/input";
import useEmployees from "@/hooks/use-employees";
import {useForm} from "@tanstack/react-form";
import useEmployeeSearchParams from "./hooks/use-employee-search-parms";
import {ExtraIncentiveForm} from "./types/ExtraIncentiveForm";
import {Icons} from "@/components/icons";
import {CircularIcon} from "@/components/ui/icon";
import FieldError from "@/components/ui/field-error";
import {isNullOrUndefinedOrEmpty} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";

const AmountDialog: React.FC<IAmountDialog> = ({onMutate, period}) => {
    const {getEmployeeId} = useEmployeeSearchParams();
    const employeeId = Number(getEmployeeId) || undefined;
    const [isOpen, setIsOpen] = React.useState(false);

    const {GetAmountTypes, AddExtraIncentive} = useEmployees();

    const {
        data: amountTypes,
        isLoading: amountTypesIsLoading,
        error: amountTypesError,
    } = GetAmountTypes();

    const {mutateAsync: postAsync, isPending} = AddExtraIncentive();

    const form = useForm<ExtraIncentiveForm>({
        defaultValues: {
            PersonId: employeeId,
            ItemType: undefined,
            Month: period?.month,
            Year: period?.year,
            Amount: "",
            Notes: "",
        },
        onSubmit: async ({value}) => {
            await postAsync(value, {
                onSuccess: () => {
                    if (onMutate) {
                        onMutate();
                        toast({message:"Commission parameter created successfully."})
                        setIsOpen(false);
                    }
                },
                onError:()=>{
                    toast({message:"Error creating commission parameter, Please try again.",toastType:"error"})
                }
            });
        },
    });

    const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    if (amountTypesIsLoading) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild={true}>
                <Button
                    disabled={period === undefined}
                    size={"sm"}
                >
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
                        <DialogTitle>Add Amounts</DialogTitle>
                    </div>
                </DialogHeader>
                <Card>
                    <form
                        onSubmit={(e) => {
                            handleSubmitClick(e);
                        }}
                    >
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <form.Field
                                    name="ItemType"
                                    defaultValue={undefined}
                                    validators={{
                                        onChange: ({value}) =>
                                            isNullOrUndefinedOrEmpty(value) ? 'Type is required'
                                                : undefined,
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <Label weight="medium" htmlFor={field.name}>Type</Label>
                                                <Select onValueChange={(value) => field.handleChange(Number(value))}
                                                        name={field.name}
                                                        value={field.state.value?.toString()}>
                                                    <SelectTrigger
                                                        className={`mt-1 ${field.state.meta.errors.length ? "border-danger-200" : ""}`}>
                                                        <SelectValue placeholder="Select amount type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {amountTypes &&
                                                            amountTypes!.map((amount) => (
                                                                <SelectItem
                                                                    key={amount.id}
                                                                    value={amount.id.toString()}
                                                                >
                                                                    {amount.type}
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
                            <div className="relative">
                                <form.Field
                                    name={'Amount'}
                                    defaultValue={''}
                                    validators={{
                                        onChange: ({value}) =>
                                            !value ? 'Amount is required'
                                                : undefined,
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <Label weight="medium" htmlFor={field.name}>Amount</Label>
                                                <Input
                                                    className={`mt-1`}
                                                    id={field.name}
                                                    data-error={field.getMeta().errors.length>0}
                                                    type='number'
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    placeholder="Enter your amount"
                                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                                />
                                                <FieldError field={field}/>
                                            </>
                                        )
                                    }}
                                />
                            </div>
                            <div className="relative">
                                <form.Field
                                    name="Notes"
                                    defaultValue={''}
                                    children={(field) => {
                                        return (
                                            <>
                                                <Label weight="medium" htmlFor={field.name}>Message</Label>
                                                <Textarea
                                                    className={`mt-1`}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    placeholder="Enter your message"
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            </>
                                        )
                                    }}
                                />
                            </div>
                        </CardContent>
                        <DialogFooter className="justify-end gap-4 border-t border-gray-100">
                            <Button
                                variant={'outline'}
                                shade={'gray'}
                                onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <form.Subscribe
                                children={() => (
                                    <Button type="submit" isLoading={isPending}>
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

export default AmountDialog;
