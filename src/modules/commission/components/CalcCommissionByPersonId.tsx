import {Button} from "@/components/ui/button";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import useCommissionByPlan from "@/hooks/use-commission";
import {CommissionByPersonParams} from "@/interfaces/IUseCommission";
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import React, {useState} from "react";
import CommissionPeriod from "@/types/CommissionPeriod";
import {toast} from "@/components/ui/use-toast";

export default function CalcCommissionByPersonId({
                                                     selectedPersonId,
                                                     commissionPeriod,
                                                     setTimerRunning,
                                                 }: {
    selectedPersonId: number;
    commissionPeriod?: CommissionPeriod;
    setTimerRunning: (running: boolean) => void;
}) {
    const [calcCommissionPeriod, setCalcCommissionPeriod] = useState<
        CommissionByPersonParams | undefined
    >(undefined);

    const {GetCommissionPeriods} = useCommissionByPlan();

    const {isLoading: commissionPeriodsIsLoading} = GetCommissionPeriods();

    const handleCalculate = () => {
        if (isNaN(selectedPersonId)) {
            toast({message:"Please select a valid sales plan",toastType:'error'});
            return;
        }

        if (!commissionPeriod) {
            toast({message:"Please select a valid period",toastType:'error'});
            return;
        }

        const commissionParams: CommissionByPersonParams = {
            month: commissionPeriod.month,
            year: commissionPeriod.year,
            personId: selectedPersonId,
        };
        setCalcCommissionPeriod(commissionParams);
    };

    return (
        <>
            <Button
                disabled={!commissionPeriod}
                onMouseDown={handleCalculate}
                isLoading={commissionPeriodsIsLoading}
                className="whitespace-nowrap"
            >
                Calculate Commission
            </Button>
            {calcCommissionPeriod && (
                <CalculatingDialog
                    params={calcCommissionPeriod}
                    onOpenChange={(e) => {
                        setCalcCommissionPeriod(undefined);
                        if (e === false) {
                            //when closing the dialog box
                            setTimerRunning(true);
                        }
                    }}
                />
            )}
        </>
    );
}

function CalculatingDialog({
                               params,
                               onOpenChange,
                           }: {
    params: CommissionByPersonParams | undefined;
    onOpenChange: (open: boolean) => void;
}) {
    const {CalculateCommissionByPersonId: CalcCommission} =
        useCommissionByPlan();
    const {data, isLoading: isCalcLoading} = CalcCommission(params);
    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent>
                {!isCalcLoading &&  <DialogHeader className="border-b-0 items-center">
                    <DialogDescription className="text-title-lg">Commissions calculation initiated</DialogDescription>
                </DialogHeader>}
                <div>
                    {isCalcLoading &&
                        <div className="md:p-6 p-4 flex flex-col justify-center items-center">
                            <LoadingSpinner/>
                            <DialogTitle className="text-heading-3 text-center mb-3 mt-8">Calculating...</DialogTitle>
                            <DialogDescription className="!text-body-lg text-200 text-center">
                                Please wait while we calculate the commissions for the selected
                                period.</DialogDescription>
                        </div>
                        // :<DialogDescription className="text-center md:p-6 p-4">Commissions calculation initiated</DialogDescription>
                        // <Card className="w-full border-0">
                        //     {commissionInfo && commissionInfo?.length > 0 ? <><CardContent
                        //         className="space-y-1 md:p-6 p-4 max-h-[calc(100vh-180px)] overflow-y-auto tiny-scrollbar">
                        //         {commissionInfo?.map((info) => (
                        //             <div className="flex justify-between" key={info.id}>
                        //                 <span className="text-body-lg text-200">{info.item}:</span>
                        //                 <span className="text-title-md font-semibold">${info.amount}</span>
                        //             </div>
                        //         ))}
                        //     </CardContent>
                        //         <HorizontalDivider/>
                        //         <CardFooter className="p-6 justify-between">
                        //             <span className="text-body-lg text-200">Total Commission</span>
                        //             <span className="text-title-md font-semibold">${commissionInfo
                        //                 ?.reduce((total, info) => total + info.amount, 0)
                        //                 .toFixed(2)}</span>
                        //         </CardFooter></> : <CardDescription
                        //         className="p-6 text-center">
                        //         Commission not found
                        //     </CardDescription>}
                        // </Card>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}

function LoadingSpinner() {
    return (
        <svg id="svg-spinner" className="animate-spin" width="60" height="60">
            <defs>
                <clipPath id="cut-off">
                    <rect x="0" y="30" width="60" height="60"/>
                </clipPath>
                <linearGradient id="gradient">
                    <stop offset="0" stopColor="var(--primary-500)"></stop>
                    <stop offset="10%" stopColor="var(--primary-500)" stopOpacity="0.9"></stop>
                    <stop offset="20%" stopColor="var(--primary-500)" stopOpacity="0.8"></stop>
                    <stop offset="30%" stopColor="var(--primary-500)" stopOpacity="0.7"></stop>
                    <stop offset="40%" stopColor="var(--primary-500)" stopOpacity="0.6"></stop>
                    <stop offset="50%" stopColor="var(--primary-500)" stopOpacity="0.5"></stop>
                    <stop offset="60%" stopColor="var(--primary-500)" stopOpacity="0.4"></stop>
                    <stop offset="70%" stopColor="var(--primary-500)" stopOpacity="0.3"></stop>
                    <stop offset="80%" stopColor="var(--primary-500)" stopOpacity="0.2"></stop>
                    <stop offset="90%" stopColor="var(--primary-500)" stopOpacity="0.1"></stop>
                    <stop offset="100%" stopColor="var(--primary-500)" stopOpacity="0"></stop>
                </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="25" stroke="var(--primary-translucent)" strokeWidth="8"
                    fill="none"
                    opacity="0.8"></circle>
            <circle cx="30" cy="30" r="25" stroke="url(#gradient)" strokeWidth="8" fill="none"
                    clipPath="url(#cut-off)"></circle>
        </svg>
    )
}
