import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import useEmployees from "@/hooks/use-employees";
import {useEffect, useRef, useState} from "react";
import useEmployeeSearchParams from "./hooks/use-employee-search-parms";
import {Skeleton} from "../ui/skeleton";
import {toast} from "@/components/ui/use-toast";
import {useElementDimensions} from "@/hooks/use-emelent-dimension";

function SalesPlanTab() {
    const {getEmployeeId} = useEmployeeSearchParams();

    const employeeId = Number(getEmployeeId) || undefined;
    const dropdownRef = useRef(null);
    const dropdownDimension = useElementDimensions(dropdownRef.current);

    const {GetSalesPlans, GetPersonSalesPlan, SavePersonSalesPlan} =
        useEmployees();
    const {
        data: salesPlans,
        isLoading: currentSalesPlansIsLoading,
        error: currentSalesPlansError,
    } = GetSalesPlans();

    const {
        data: personSalesPlan,
        isLoading: personSalesPlanIsLoading,
        error: personSalesPlanError,
        refetch: refetchPersonSalesPlan,
    } = GetPersonSalesPlan({id: employeeId});

    const {mutateAsync: savePersonSalesPlan, isPending} = SavePersonSalesPlan();

    const initialSalesPlanId = personSalesPlan?.salesPlanId?.toString();

    const [salesPlanId, setSalesPlanId] = useState<string | undefined>(
        initialSalesPlanId
    );
    useEffect(() => {
        setSalesPlanId(initialSalesPlanId);
    }, [initialSalesPlanId]);

    const isLoadingAll = currentSalesPlansIsLoading || personSalesPlanIsLoading;

    const handleSave = async () => {
        await savePersonSalesPlan(
            {personId: employeeId, salesPlanId: Number(salesPlanId)},
            {
                onSuccess: () => {
                    toast({message: "Sales plan saved successfully"});
                    refetchPersonSalesPlan();
                },
                onError: () => {
                    toast({message: "An error occurred while saving sales plan", toastType: 'error'});
                },
            }
        );
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="py-0">
                <CardTitle>Sales Plan</CardTitle>
                <CardDescription>
                    Make changes to this employee's sales plan here. Click save when
                    you're done.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div id="salesPlanDdl" ref={dropdownRef}>
                    {isLoadingAll ? (
                        <Skeleton className="w-full h-8"/>
                    ) : (
                        <Select  value={salesPlanId} onValueChange={setSalesPlanId}>
                            <SelectTrigger >
                                <SelectValue placeholder="Choose plan"/>
                            </SelectTrigger>
                            <SelectContent>
                                {salesPlans &&
                                    salesPlans!.map((salesPlan) => (
                                        <SelectItem
                                            key={salesPlan.id}
                                            value={salesPlan.id.toString()}
                                            style={{maxWidth:dropdownDimension.width+'px'}}
                                        >
                                            {salesPlan.description}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </CardContent>
            <CardFooter className="mt-auto md:p-6 p-4 justify-end border-t">
                <Button
                    isLoading={isLoadingAll || isPending}
                    type="button"
                    onClick={handleSave}>
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}

export default SalesPlanTab;
