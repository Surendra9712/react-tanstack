import {ISalesLogTable} from "@/interfaces/ISalesLogTable";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
} from "../ui/table";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {EmptyState} from "@/components/ui/emptyState";
import {isNullOrUndefinedOrEmpty} from "@/lib/utils";
import TableSkeleton from "@/components/ui/TableSkeleton";

const SalesLogTable: React.FC<ISalesLogTable> = ({
                                                     salesLogs,
                                                     isLoading,
                                                     onSaleClick,
                                                 }) => {
    return (
        <>
            <Table height={salesLogs?.length > 0 ? 'max-h-[calc(100vh-226px)] md:max-h-[calc(100vh-220px)]' : 'max-h-full'}>
                <TableHeader className="sticky top-0">
                    <TableRow className="!border-b-0">
                        <TableHead>Stock Number</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Make</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Sale Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>VIN</TableHead>
                        <TableHead>Lease Amount</TableHead>
                        <TableHead>Trade Amount</TableHead>
                        <TableHead>Finance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? <TableSkeleton count={14}/> : <>
                        {salesLogs?.length ? salesLogs?.map((sale) => (
                                <TableRow className="cursor-pointer" key={sale.id} onClick={() => onSaleClick(sale.id)}>
                                    <TableCell>{sale.stockNumber}</TableCell>
                                    <TableCell> <Badge variantType="translucent"
                                                       translucent={sale.type === "New" ? 'success' : "warning"}>
                                        {sale.type}
                                    </Badge></TableCell>
                                    <TableCell>{sale.make}</TableCell>
                                    <TableCell>{sale.model}</TableCell>
                                    <TableCell>{isNullOrUndefinedOrEmpty(sale.color) ? '-' : sale.color}</TableCell>
                                    <TableCell>{sale.year}</TableCell>
                                    <TableCell>{sale.customerName}</TableCell>
                                    <TableCell>${sale.cost?.toFixed(2)}</TableCell>
                                    <TableCell>${sale.saleAmount?.toFixed(2)}</TableCell>
                                    <TableCell>{sale.dateStr}</TableCell>
                                    <TableCell>{sale.vin}</TableCell>
                                    <TableCell>
                                        {sale.leaseAmount == null
                                            ? "-"
                                            : "$" + sale.leaseAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {sale.tradeAmount == null || sale.tradeAmount < 1
                                            ? "-"
                                            : "$" + sale.tradeAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>{sale.finance}</TableCell>
                                </TableRow>
                            ))
                            : <TableRow className="h-[calc(100vh-250px)]">
                                <TableCell colSpan={14} className="w-full">
                                    <EmptyState
                                        message={'You must select the date to get the required data.'}/>
                                </TableCell>
                            </TableRow>}</>}

                </TableBody>
            </Table>
        </>
    );
};

export default SalesLogTable;
