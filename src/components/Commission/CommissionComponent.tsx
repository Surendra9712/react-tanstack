import React, {useRef, useState} from "react";
import CommissionTable from "./CommissionTable";
import Commission from "@/types/Commission";
import useCommissionByPlan from "@/hooks/use-commission";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import SalesPeopleDialog from "./SalesPeopleDialog";
import FinanceDialog from "./FinanceDialog";
import LeasedDialog from "./LeasedDialog";
import CommissionPeriod from "@/types/CommissionPeriod";
import useAuth from "@/hooks/use-auth";
import ManagerWrapper from "@/auth/components/ManagerWrapper";
import CalcCommissionByPersonId from "@/modules/commission/components/CalcCommissionByPersonId";
import EmployeesComboBox from "../Employees/EmployeesComboBox";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Icons} from "@/components/icons";
import setPageTitle from "@/hooks/setPageTitle";
import {Skeleton} from "@/components/ui/skeleton";
import CommissionMiniTable from "@/components/Commission/CommissionMiniTable";

const CommissionComponent: React.FC = () => {
    setPageTitle("Commission");
    const {User} = useAuth();
    const myUserId = User?.PersonId;
    const [isSalesPeopleDialogOpen, setIsSalesPeopleDialogOpen] = useState(false);
    const [isFinanceDialogOpen, setIsFinanceDialogOpen] = useState(false);
    const [isLeasedDialogOpen, setIsLeasedDialogOpen] = useState(false);
    const cardHeaderRef = useRef(null);
    //modal state
    const [dialogMode, setDialogMode] = useState<
        "salesPeople" | "finance" | "leased" | "default"
    >("default");
    //month state
    const [selectedMonth, setSelectedMonth] = useState<
        CommissionPeriod | undefined
    >(undefined);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(
        myUserId?.toString()!
    );
    //current edit commission
    const [tempCommission, setTempCommission] = useState<Commission | null>(null);
    //form data and functions
    const {
        GetCommissions,
        GetCommissionPeriods,
        CreateCommission,
        UpdateCommission,
        DeleteCommission,
        GetCommissionInfo,
        CalculateCommissionByPersonId,
    } = useCommissionByPlan();
    const {
        data: commissionPeriods,
        isLoading: commissionPeriodsIsLoading,
        error: commissionPeriodsError,
    } = GetCommissionPeriods();
    const {
        data: commissions,
        isLoading: commissionsIsLoading,
        error: commissionsError,
        refetch,
    } = GetCommissions({
        month: selectedMonth?.month,
        year: selectedMonth?.year,
        personId: Number(selectedEmployeeId),
    });
    const {
        data: commissionInfo,
        isLoading: commissionInfoIsLoading,
        error: commissionInfoError,
        refetch: refetchCommissionInfo,
    } = GetCommissionInfo({
        month: selectedMonth?.month,
        year: selectedMonth?.year,
        personId: Number(selectedEmployeeId),
    });
    const {
        status: statusCreate,
        error: errorCreate,
        mutate: mutateCreate,
    } = CreateCommission();
    const {
        status: statusUpdate,
        error: errorUpdate,
        mutate: mutateUpdate,
    } = UpdateCommission();
    const {
        status: statusDelete,
        error: errorDelete,
        mutate: mutateDelete,
    } = DeleteCommission();

    const clearSalesPeopleDialog = () => {
        setTempCommission(null);
        setIsSalesPeopleDialogOpen(false);
        setDialogMode("default");
    };

    const clearFinanceDialog = () => {
        setTempCommission(null);
        setIsFinanceDialogOpen(false);
        setDialogMode("default");
    };

    const clearLeasedDialog = () => {
        setTempCommission(null);
        setIsLeasedDialogOpen(false);
        setDialogMode("default");
    };

    if (commissionsError) {
        return <div>Error Loading Commission</div>;
    }

    if (commissionInfoError) {
        return <div>Error Loading Commission Info</div>;
    }

    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const handleSalesPeopleClick = async (commissionId: number) => {
        const commission = commissions?.find(com => com.id === commissionId);
        setDialogMode("salesPeople");
        setTempCommission(commission as Commission);
        setIsSalesPeopleDialogOpen(true);
    };

    const handleFinanceClick = async (commissionId: number) => {
        setDialogMode("finance");
        setTempCommission({
            id: commissionId,
            stockNumber: "0",
            type: "",
            model: "",
            make: "",
            year: 0,
            saleAmount: 0,
            splitWith: "",
            date: new Date(),
            dateStr: "",
            customerName: "",
            salesPerson: {},
            salesPeople: [],
            finance: "",
            bankName: commissions?.find((c) => c.id == commissionId)?.bankName,
            bankFee: commissions?.find((c) => c.id == commissionId)?.bankFee,
            saleType: "",
            financeReserve: commissions?.find((c) => c.id == commissionId)
                ?.financeReserve,
        } as unknown as Commission);
        setIsFinanceDialogOpen(true);
    };

    const handleLeasedClick = async (commissionId: number) => {
        setDialogMode("leased");
        setTempCommission({
            id: commissionId,
            stockNumber: "0",
            type: "",
            model: "",
            make: "",
            year: 0,
            saleAmount: 0,
            splitWith: "",
            date: new Date(),
            dateStr: "",
            customerName: "",
            salesPerson: {},
            salesPeople: [],
            finance: "",
            bankName: "",
            bankFee: 0,
            saleType: "",
            financeReserve: 0,
            leasedIncome: commissions?.find((c) => c.id == commissionId)
                ?.leasedIncome,
        } as unknown as Commission);
        setIsLeasedDialogOpen(true);
    };

    const handleMonthChange = (commissionPeriod: string) => {
        setSelectedMonth(
            commissionPeriods?.find((f) => f.period == commissionPeriod)
        );
    };

    return (
        <Card className="min-h-full max-md:border">
            <CardHeader className="flex-row gap-3 lg:gap-4 justify-between flex-wrap items-center" ref={cardHeaderRef}>
                <CardTitle>Commission</CardTitle>
                <div id="monthsDdl" className="flex gap-3 flex-wrap">
                    <div className="grid grid-cols-2 gap-3">
                        <Select
                            value={selectedMonth?.period}
                            onValueChange={handleMonthChange}
                            defaultValue={selectedMonth?.period}
                        >
                            <div className="flex items-center relative">
                                <span className="absolute left-3">{Icons.calendar()}</span>
                                <SelectTrigger className="focus:ring-0 focus:border-gray-200 pl-8">
                                    <SelectValue placeholder="Choose period"/>
                                </SelectTrigger>
                            </div>

                            <SelectContent>
                                {commissionPeriods &&
                                    commissionPeriods!.map((commissionPeriod) => (
                                        <SelectItem
                                            key={commissionPeriod.id}
                                            value={commissionPeriod.period}
                                            aria-selected={commissionPeriod.id === selectedMonth?.id}
                                            onSelect={() =>
                                                handleMonthChange(commissionPeriod.period)
                                            }
                                        >
                                            {commissionPeriod.period}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <ManagerWrapper>
                            <EmployeesComboBox
                                value={selectedEmployeeId}
                                setValue={setSelectedEmployeeId}
                            />
                        </ManagerWrapper>
                    </div>
                    <>
                        <CalcCommissionByPersonId
                            selectedPersonId={Number(selectedEmployeeId) || 0}
                            commissionPeriod={selectedMonth}
                            setTimerRunning={(e) => {
                                refetchCommissionInfo()
                                setIsTimerRunning(e)
                            }}
                        />
                    </>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
                <CommissionTable
                    headerElement={cardHeaderRef.current}
                    isLoading={commissionsIsLoading}
                    commissions={commissions}
                    handleSalesPeopleClick={handleSalesPeopleClick}
                    handleFinanceClick={handleFinanceClick}
                    handleLeasedClick={handleLeasedClick}
                />


                {commissionInfoIsLoading && <Skeleton className="mt-5 w-1/4"/>}
                {(!commissionInfoIsLoading && commissions?.length) ? (
                    <CommissionMiniTable commissionInfo={commissionInfo!}/>
                ) : null}

                <SalesPeopleDialog
                    isSalesPeopleDialogOpen={isSalesPeopleDialogOpen}
                    clearSalesPeopleDialog={clearSalesPeopleDialog}
                    salesPeople={tempCommission?.salesPeople}
                    commission={tempCommission}
                />
                <FinanceDialog
                    isFinanceDialogOpen={isFinanceDialogOpen}
                    clearFinanceDialog={clearFinanceDialog}
                    bankName={tempCommission?.bankName!}
                    bankFee={tempCommission?.bankFee!}
                    financeReserve={tempCommission?.financeReserve!}
                />
                <LeasedDialog
                    isLeasedDialogOpen={isLeasedDialogOpen}
                    clearLeasedDialog={clearLeasedDialog}
                    leasedIncome={tempCommission?.saleAmount!}
                />
            </CardContent>
        </Card>
    );
};

export default CommissionComponent;
