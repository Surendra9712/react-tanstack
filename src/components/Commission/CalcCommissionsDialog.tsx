import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import useCommissionByPlan from "@/hooks/use-commission";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import useSalesPlanSearchParams from "../SalesPlan/hooks/use-sales-plan-search-params";
import { CommissionByPlanParams } from "@/interfaces/IUseCommission";
import LoadingIcon from "../ui/loading-icon";

export default function CalculateCommissionsDialog() {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | undefined>(
    undefined
  );
  const [calcCommissionPeriod, setCalcCommissionPeriod] = useState<
    CommissionByPlanParams | undefined
  >(undefined);

  const { planId: planIdQuery } = useSalesPlanSearchParams();

  const { GetCommissionPeriods } = useCommissionByPlan();

  const { data: commissionPeriods, isLoading: commissionPeriodsIsLoading } =
    GetCommissionPeriods();

  const handleCalculate = () => {
    //TODO: add api call here};
    let periodId = Number(selectedPeriodId);

    let planId = Number(planIdQuery);

    if (isNaN(periodId)) {
      alert("Please select a valid period");
      return;
    }

    if (isNaN(planId)) {
      alert("Please select a valid sales plan");
      return;
    }

    const commissionPeriod = commissionPeriods?.find(
      (period) => period.id === periodId
    );

    if (!commissionPeriod) {
      alert("Please select a valid period");
      return;
    }

    const commissionParams: CommissionByPlanParams = {
      month: commissionPeriod.month,
      year: commissionPeriod.year,
      salesPlanId: planId,
    };
    setCalcCommissionPeriod(commissionParams);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild={true}>
          <Button isLoading={commissionPeriodsIsLoading}>
            Calculate Commissions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Calculate Commissions</DialogTitle>
            <DialogDescription>
              Select the sales period and click Calculate to see the commission
              details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="sales-period">
                Sales Period
              </Label>
              <Select
                value={selectedPeriodId}
                onValueChange={setSelectedPeriodId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sales period" />
                </SelectTrigger>
                <SelectContent>
                  {commissionPeriodsIsLoading ? (
                    <Skeleton className="h-10" />
                  ) : commissionPeriods ? (
                    commissionPeriods.map((period) => (
                      <SelectItem key={period.id} value={period.id.toString()}>
                        {period.period}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No Periods found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleCalculate}>
              Calculate
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {calcCommissionPeriod && (
        <CalculatingDialog
          params={calcCommissionPeriod}
          onOpenChange={(e) => {
            setCalcCommissionPeriod(undefined);
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
  params: CommissionByPlanParams | undefined;
  onOpenChange: (open: boolean) => void;
}) {
  const { CalcCommissionByPlan: CalcCommission } = useCommissionByPlan();
  const { data, isLoading: isCalcLoading } = CalcCommission(params);
  return (
    <Dialog open={params !== undefined} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calculating Commissions</DialogTitle>
          <DialogDescription>
            {isCalcLoading && <LoadingIcon />}
            {data && <span>Commissions calculation initiated</span>}
            {!data && (
              <span>
                Please wait while we calculate the commissions for the selected
                period.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button isLoading={isCalcLoading} variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
