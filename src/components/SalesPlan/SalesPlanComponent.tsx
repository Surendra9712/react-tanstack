import React, { useState } from "react";
import SalesPlanTable from "./SalesPlanTable";
import SalesPlan from "@/types/SalesPlan";
import SalesPlanDialog from "./SalesPlanDialog";
import useSalesPlans from "@/hooks/use-salesPlans";
import useSalesPlanSearchParams from "./hooks/use-sales-plan-search-params";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import setPageTitle from "@/hooks/setPageTitle";

const SalesPlanComponent: React.FC = () => {
  setPageTitle("Sales Plan");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isParameterExampleDialogOpen, setIsParameterExampleDialogOpen] =
    useState(false);
  const [isAddPlanParticipantsDialogOpen, setIsAddPlanParticipantsDialogOpen] =
    useState(false);

  const { setPlanId } = useSalesPlanSearchParams();
  //current edit sale
  const [tempPlan, setTempPlan] = useState<SalesPlan | undefined>(undefined);
  const {
    GetSalesPlans,
    DeletePlanParticipant,
    UpdateSalesPlan,
    CreateNewFrom,
  } = useSalesPlans();
  const {
    data: salesPlans,
    isLoading: salesPlansIsLoading,
    error: salesPlansError,
    refetch,
  } = GetSalesPlans();

  //#region dialog functions
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const clearDialog = () => {
    setIsDialogOpen(false);
    setPlanId("null");
  };

  const openAddPlanParticipantsDialog = () => {
    setIsAddPlanParticipantsDialogOpen(true);
  };

  const clearAddPlanParticipantsDialog = () => {
    setIsAddPlanParticipantsDialogOpen(false);
  };

  const openParameterExampleDialog = () => {
    setIsParameterExampleDialogOpen(true);
  };

  const clearParameterExampleDialog = () => {
    setIsParameterExampleDialogOpen(false);
  };
  //#endregion

  //#region useEffects

  //#endregion

  if (salesPlansIsLoading) {
    return <div>Loading Sales Plans...</div>;
  }
  if (salesPlansError) {
    return <div>Error Loading Sales Plans</div>;
  }
  if (!salesPlans) {
    return <div>No Sales Plans</div>;
  }

  //#region event handlers
  const handlePlanOpen = async (planId: number) => {
    setTempPlan(salesPlans.filter((e) => e.id == planId)[0]);
    setPlanId(planId.toString());
    openDialog();
  };

  return (
    <Card className="min-h-full max-md:border">
      <CardHeader>
        <CardTitle>Sales Plan Manager</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <SalesPlanTable salesPlans={salesPlans} onPlanClick={handlePlanOpen} />
        <SalesPlanDialog />
      </CardContent>
    </Card>
  );
};

export default SalesPlanComponent;
