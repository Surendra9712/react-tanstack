import {Button} from "../ui/button";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
} from "../ui/table";
import {ICommissionTable} from "@/interfaces/ICommissionTable";
import {Badge} from "@/components/ui/badge";
import {Icons} from "@/components/icons";
import React, {useEffect, useState} from "react";
import {EmptyState} from "@/components/ui/emptyState";
import TableSkeleton from "@/components/ui/TableSkeleton";

const CommissionTable: React.FC<ICommissionTable> = ({
                                                         commissions,
                                                         isLoading,
                                                         handleSalesPeopleClick,
                                                         handleFinanceClick,
                                                         handleLeasedClick,
                                                         headerElement
                                                     }) => {
    const [headerHeight, setHeaderHeight] = useState<number>(154);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [headerElement]);

    const handleResize = () => {
        if (headerElement) {
            const defaultHeight = window.innerWidth > 768 ? 154 : 140;
            const newHeight = defaultHeight + headerElement.clientHeight;
            setHeaderHeight(newHeight);
        }
    }

    return (
        <Table>
            <TableHeader className="sticky top-0">
                <TableRow className="!border-b-0">
                    <TableHead>Stock Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Sale Amount</TableHead>
                    <TableHead>Split With</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Sales Person</TableHead>
                    <TableHead>Finance</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? <TableSkeleton count={11}/> : <>{commissions?.length ? commissions?.map((commission) => (
                        <TableRow key={commission.id}>
                            <TableCell>{commission.stockNumber}</TableCell>
                            <TableCell> <Badge variantType="translucent"
                                               translucent={commission.type === "New" ? 'success' : "warning"}>
                                {commission.type}
                            </Badge></TableCell>
                            <TableCell>{commission.make}</TableCell>
                            <TableCell>{commission.model}</TableCell>
                            <TableCell>{commission.year}</TableCell>
                            <TableCell>{commission.saleAmount.toFixed(2)}</TableCell>
                            <TableCell>{commission.splitWith === "" ? "-" : commission.splitWith}</TableCell>
                            <TableCell>{commission.dateStr}</TableCell>
                            <TableCell>{commission.customerName}</TableCell>
                            <TableCell className="flex justify-between">
                                {commission.salesPerson?.employeeName}
                                {commission.salesPerson ? <Button
                                    type="submit"
                                    variant={"subtle"}
                                    onClick={() => handleSalesPeopleClick(commission.id)}
                                    className="!gap-1 h-8 !px-1.5"
                                >
                                    {Icons.plus()}{commission.salesPeople.length}
                                </Button> : "-"}

                            </TableCell>
                            <TableCell>{commission.finance}</TableCell>
                            <TableCell>
                                {["Finance", "Leased"].includes(commission.saleType) ? ( // Check if saleType is "Finance" or "Leased"
                                    <div
                                        onClick={() => {
                                            if (commission.saleType === "Finance") {
                                                handleFinanceClick(commission.id); // Call handleFinanceClick if saleType is "Finance"
                                            } else if (commission.saleType === "Leased") {
                                                handleLeasedClick(commission.id); // Call handleLeasedClick if saleType is "Leased"
                                            }
                                        }}
                                        className="pl-0 text-body-md text-primary font-medium hover:underline cursor-pointer"
                                    >
                                        {commission.saleType}
                                    </div>
                                ) : (
                                    commission.saleType // Display the saleType value normally if it's not "Finance" or "Leased"
                                )}
                            </TableCell>
                        </TableRow>
                    )) :
                    <TableRow className="lg:h-[calc(100vh-270px)] h-[calc(100vh-340px)]">
                        <TableCell colSpan={12}>
                            <EmptyState message={'You must select the date to get the required data.'}/>
                        </TableCell>
                    </TableRow>}</>}

            </TableBody>
        </Table>
    );
};

export default CommissionTable;
