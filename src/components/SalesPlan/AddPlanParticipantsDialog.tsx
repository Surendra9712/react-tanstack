import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {DialogClose, DialogTrigger} from "@/components/ui/dialog";
import useSalesPlans from "@/hooks/use-salesPlans";
import useSalesPlanSearchParams from "./hooks/use-sales-plan-search-params";
import {SalesPlanParticipantForm} from "./SalesPlanParticipantForm";
import {Icons} from "@/components/icons";
import {CircularIcon} from "@/components/ui/icon";
import useEmployees from "@/hooks/use-employees";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "@/components/ui/use-toast";

const AddPlanParticipantsDialog = () => {
    const {planId: planIdParam} = useSalesPlanSearchParams();
    const [error, setError] = useState<string | null>(null);
    const salesPlanId = planIdParam === "null" ? undefined : Number(planIdParam);

    const [selectedParticipant, setSelectedParticipant] = useState<
        string | undefined
    >(undefined);

    const {GetEmployees} = useEmployees();
    const {
        data: employees,
        isLoading: employeesIsLoading,
        error: employeesError,
        refetch: refetchEmployees,
    } = GetEmployees();

    const {
        GetElligableParticipants,
        AddPlanParticipant,
        DeletePlanParticipant,
        GetParticipants,
    } = useSalesPlans();
    const {
        data: participants,
        isLoading: participantsIsLoading,
        error: participantsError,
        refetch: refetchParticipants,
    } = GetParticipants(salesPlanId ? {salesPlanId: salesPlanId} : undefined);
    const {
        data: elligableParticipants,
        isLoading: elligableParticipantsIsLoading,
        error: elligableParticipantsError,
    } = GetElligableParticipants();

    const availableParticipants = elligableParticipants?.filter(
        (p) => participants && !participants?.some((pp) => pp.id === p.id)
    );

    const {mutate: addParticipant, isPending} = AddPlanParticipant();

    const handleAddParticipantClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Find the participant to add
        if(!selectedParticipant){
            setError("Selected employee");
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        const participantToAdd = elligableParticipants!.find(
            (p) => p.id === Number(selectedParticipant)
        );
        if (participantToAdd) {
            // Add the participant
            const AddParticipantForm: SalesPlanParticipantForm = {
                EmployeeId: participantToAdd.id,
                SalesPlanId: salesPlanId!,
            };
            await addParticipant(AddParticipantForm, {
                onSuccess: () => {
                    refetchParticipants();
                    toast({message: "Participant created successfully."})
                },
                onError: (saveParticipantsError: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toast({message: "Error adding participants. Please try again.", toastType: 'error'})
                },
            });
        } else {
            e.stopPropagation();
            e.preventDefault();
            setError("Selected employee is not eligible.");
        }
    };
    //#endregion

    return (
        <Dialog onOpenChange={() => {
            setSelectedParticipant(undefined)
            setError(null)
        }}>
            <DialogTrigger asChild>
                <Button size={"sm"} className="whitespace-nowrap w-fit">
                    {Icons.plus()}
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px]">
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.addCircle(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Add Plan Participant</DialogTitle>
                    </div>
                </DialogHeader>
                <Card>
                    <CardContent className="space-y-1 mb-2">
                        <Label weight="medium">Plan Participant</Label>
                        <Select onValueChange={(val) => {
                            setError(null);
                            setSelectedParticipant(val)
                        }}>
                            <SelectTrigger className={`mt-1 ${error ? 'border-danger-100' : ""}`}>
                                <SelectValue placeholder="Select employee"/>
                            </SelectTrigger>
                            <SelectContent>
                                {employees &&
                                    employees!.map((product) => (
                                        <SelectItem
                                            key={product.id}
                                            value={product.id.toString()}
                                        >
                                            {product.employeeName}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        {error && <span className="absolute text-danger text-body-sm">{error}</span>}
                    </CardContent>

                </Card>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant={'outline'}
                            shade={'gray'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            isLoading={isPending}
                            onClick={(e) => handleAddParticipantClick(e)}>
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddPlanParticipantsDialog;
