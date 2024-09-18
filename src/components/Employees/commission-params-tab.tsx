import {Button} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import AmountDialog from "./AmountDialog";
import useEmployees from "@/hooks/use-employees";
import useEmployeeSearchParams from "./hooks/use-employee-search-parms";
import CommissionPeriod from "@/types/CommissionPeriod";
import {Skeleton} from "../ui/skeleton";
import {PersonSalesPlanAttribute} from "@/interfaces/IPersonSalesPlanAttribute";
import React, {useEffect, useState} from "react";
import {CheckedState} from "@radix-ui/react-checkbox";
import {Icons} from "@/components/icons";
import AdditionAmount from "@/types/AdditionAmount";
import {isNullOrUndefined} from "@/lib/utils";
import {HorizontalDivider} from "@/components/ui/divider";
import {Title} from "@/components/ui/title";
import {Badge} from "@/components/ui/badge";
import {toast} from "@/components/ui/use-toast";

interface CommissionParametersTabProps {
    commissionPeriods: CommissionPeriod[] | undefined;
    selectedCommPeriod: CommissionPeriod | undefined;
    setSelectedCommPeriod: (value: CommissionPeriod | undefined) => void;
}

function CommissionParametersTab({
                                     commissionPeriods,
                                     selectedCommPeriod,
                                     setSelectedCommPeriod,
                                 }: CommissionParametersTabProps) {
    const {
        GetAdditionalAmounts,
        GetPersonSalesPlanAttributes,
        SavePersonSalesPlanAttributes,
    } = useEmployees();
    const {getEmployeeId, getDialogParam} = useEmployeeSearchParams();

    const {mutateAsync: saveSalesPlanAttrAsync, isPending: savePending} =
        SavePersonSalesPlanAttributes();

    const [amounts, setAmounts] = useState<AdditionAmount[] | undefined>(undefined)

    if (getDialogParam == "Create") {
        return (
            <Card className="h-[calc(100vh-300px)] tiny-scrollbar overflow-y-auto">
                <CardHeader className="py-0">
                    <CardTitle>Commission Parameters</CardTitle>
                    <CardDescription>
                        First create the employee before making changes here.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const employeeId = Number(getEmployeeId) || undefined;

    const {
        data: personSalesPlanAttributes,
        isLoading: personSalesPlanAttributesIsLoading,
        refetch: refetchSalesPlanAttributes,
    } = GetPersonSalesPlanAttributes({id: employeeId});

    const {
        data: additionalAmounts,
        isLoading: additionalAmountsIsLoading,
        error: additionalAmountsError,
        refetch: refetchExtraIncentives,
    } = GetAdditionalAmounts({
        id: employeeId,
        month: selectedCommPeriod?.month,
        year: selectedCommPeriod?.year,
    });

    const [isCsiMet, setIsCsiMet] = useState(false);

    const handleCommissionPeriodChange = (value: string) => {
        const selectedPeriod = commissionPeriods!.find(
            (period) => period.period === value
        );
        setSelectedCommPeriod(selectedPeriod);
        // set csi checkmark based on selected period
        const planAttr = personSalesPlanAttributes?.find(
            (attr: PersonSalesPlanAttribute) =>
                attr.year === selectedPeriod?.year &&
                attr.month === selectedPeriod?.month
        );
        setIsCsiMet(planAttr?.value === "1" ? true : false);
    };

    const handleSaveSalesPlanAttributes = async () => {
        if (!commissionPeriods && !selectedCommPeriod) return;

        const planAttr = personSalesPlanAttributes?.find(
            (attr) =>
                attr.year === selectedCommPeriod?.year &&
                attr.month === selectedCommPeriod?.month
        ) || {
            personId: employeeId,
            year: selectedCommPeriod?.year,
            month: selectedCommPeriod?.month,
            value: isCsiMet ? "1" : "0",
        };

        planAttr.personId = employeeId;
        planAttr.value = isCsiMet ? "1" : "0";

        await saveSalesPlanAttrAsync([planAttr], {
            onSuccess: () => {
                refetchSalesPlanAttributes();
                toast({message:"Commission settings saved successfully."});
            },
            onError: (error: any) => {
                toast({message:"Error saving commission settings. Please try again.",toastType:"error"})
            },
        });
    };

    useEffect(() => {
        if (!isNullOrUndefined(additionalAmounts)) {
            setAmounts(additionalAmounts);
        }
    }, [additionalAmounts]);

    return (
        <Card className="h-full flex flex-col">
            <div className="md:h-[calc(100vh-389px)] h-[calc(100vh-373px)] tiny-scrollbar overflow-y-auto space-y-4 md:space-y-6">
                <CardHeader className="py-0">
                    <CardTitle>Commission Parameters</CardTitle>
                    <CardDescription>
                        Make changes to the commission parameters here. Click save when you're
                        done.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <div>
                        <Label weight={'medium'} htmlFor="reportsTo">Period</Label>
                        <div id="commissionPeriodsSalesDdl" className="mb-4 mt-1">
                            <Select
                                value={selectedCommPeriod?.period}
                                onValueChange={handleCommissionPeriodChange}
                                defaultValue={selectedCommPeriod?.period}
                            >
                                <SelectTrigger>
                                    <div className="flex items-center gap-2">
                                        <span>{Icons.calendar()}</span>
                                        <SelectValue placeholder="Choose period"/>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {commissionPeriods &&
                                        commissionPeriods!.map((salesPlanPeriod) => (
                                            <SelectItem
                                                key={salesPlanPeriod.id}
                                                value={salesPlanPeriod.period}
                                            >
                                                {salesPlanPeriod.period}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {!selectedCommPeriod ? (
                        <div>Please select a commission period.</div>
                    ) : (
                        <div>
                            <div className="flex items-center space-x-2">
                                {personSalesPlanAttributesIsLoading ? (
                                    <Skeleton className="w-32 h-6"/>
                                ) : (
                                    <>
                                        <Checkbox
                                            id="csiMet"
                                            checked={isCsiMet}
                                            onCheckedChange={(checked: CheckedState) =>
                                                setIsCsiMet(
                                                    checked === "indeterminate" ? false : checked
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="csiMet"
                                            weight={'medium'}
                                        >
                                            Met Customer Satisfaction Index (CSI)?
                                        </Label>
                                    </>
                                )}
                            </div>
                            <HorizontalDivider className="my-4"/>
                            {amounts && <>
                                <div className="flex items-center justify-between mb-4">
                                    <Title size="md">Additional Amounts</Title>
                                    <AmountDialog
                                        period={selectedCommPeriod}
                                        onMutate={() => refetchExtraIncentives()}
                                    />
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="!border-b-0">
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Added By</TableHead>
                                            {/*<TableHead>Action</TableHead>*/}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {amounts.length > 0 ? amounts.map((additionalAmount, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell>{additionalAmount.amount}</TableCell>
                                                <TableCell><Badge
                                                    translucent={'info'}>{additionalAmount.itemTypeName}</Badge></TableCell>
                                                <TableCell>{additionalAmount.addedByName}</TableCell>
                                                {/*<TableCell>*/}
                                                {/*    <Button*/}
                                                {/*        size={"icon"}*/}
                                                {/*        variant={'translucent'}*/}
                                                {/*        shade={'danger'}*/}
                                                {/*        className="h-8 w-8"*/}
                                                {/*    >*/}
                                                {/*        {Icons.trash()}*/}
                                                {/*    </Button>*/}
                                                {/*</TableCell>*/}
                                            </TableRow>
                                        )) : <TableRow>
                                            <TableCell colSpan={3} className="text-center">No Results</TableCell>
                                        </TableRow>}
                                    </TableBody>
                                </Table>
                            </>}
                        </div>
                    )}
                </CardContent>
            </div>
            <CardFooter className="mt-auto border-t md:p-6 p-4 justify-end">
                <Button
                    type="button"
                    onClick={handleSaveSalesPlanAttributes}
                    isLoading={savePending}
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CommissionParametersTab;
