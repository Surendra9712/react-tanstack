import React, {useRef} from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import useSalesPlanSearchParams from "./hooks/use-sales-plan-search-params";
import useSalesPlans from "@/hooks/use-salesPlans";
import SalesPlanDialogContent, {
    SalesPlanDialogContentHandles,
} from "./SalesPlanDialogContent";
import SalesPlan from "@/types/SalesPlan";
import LogicApp from "@/types/LogicApp";
import Employee from "@/types/Employee";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import LoadingIcon from "../ui/loading-icon";

const SalesPlanDialog: React.FC = () => {
    const {planId: planIdQuery, setPlanId} = useSalesPlanSearchParams();
    const planId = planIdQuery === "null" ? undefined : Number(planIdQuery);

    const salesPlanDialogRef = useRef<SalesPlanDialogContentHandles>(null);

    const isDialogOpen = planId !== undefined && !isNaN(planId);

    const {GetSalesPlans, GetParticipants, GetPlanTypes} = useSalesPlans();

    const {
        data: salesPlans,
        isLoading: salesPlansIsLoading,
        error: salesPlansError,
        refetch: refetchSalesPlans,
    } = GetSalesPlans();

    const {
        data: participants,
        isLoading: participantsIsLoading,
        error: participantsError,
        refetch: refetchParticipants,
    } = GetParticipants(planId ? {salesPlanId: planId} : undefined);

    const {
        data: planTypes,
        isLoading: planTypesIsLoading,
        error: planTypesError,
    } = GetPlanTypes();

    const closeDialog = () => {
        setPlanId("null");
    };

    const handleSave = async () => {
        if (salesPlanDialogRef.current) {
            await salesPlanDialogRef.current.onSave();
        }
    };

    const handleSaveAsNew = async () => {
        if (salesPlanDialogRef.current) {
            await salesPlanDialogRef.current.onSaveAsNew();
        }
    };

    // console.log({salesPlans,planTypes})

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={() => {
                closeDialog();
            }}>
            <DialogContent className="max-w-[800px]">
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.pen(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Manage Sales Plan</DialogTitle>
                    </div>
                </DialogHeader>
                <SalesPlanDialogContent
                    planId={planId}
                    salesPlans={salesPlans as SalesPlan[]}
                    planTypes={planTypes as LogicApp[]}
                    participants={participants as Employee[]}
                    refetchSalesPlans={refetchSalesPlans}
                    refetchParticipants={refetchParticipants}
                    ref={salesPlanDialogRef}
                />
                <DialogFooter>
                  <Button variant={'outline'} onClick={handleSaveAsNew}>
                    Save as New
                  </Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SalesPlanDialog;
