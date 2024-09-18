import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {isNullOrUndefinedOrEmpty} from "@/lib/utils";
import {EmptyState} from "@/components/ui/emptyState";
import React from "react";
import {Title} from "@/components/ui/title";

export default function ReportTable() {
    const salesReport = [
        {
            "id": 1,
            "type": "Used",
            "model": "XC90",
            "make": "Volvo",
            "year": 2024,
            "cost": 60000,
            "saleAmount": 73000,
            "color": "",
            "dateStr": "1/16/2024",
            "vin": "YV4102KK3P",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 2,
            "type": "New",
            "model": "XC60",
            "make": "Volvo",
            "year": 2024,
            "cost": 45000,
            "saleAmount": 56500,
            "color": "",
            "dateStr": "1/3/2024",
            "vin": "YV4102LK0X",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 3,
            "type": "New",
            "model": "XC40",
            "make": "Volvo",
            "year": 2024,
            "cost": 35000,
            "saleAmount": 45500,
            "color": "",
            "dateStr": "1/30/2024",
            "vin": "YV4A22PK5F",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 4,
            "type": "New",
            "model": "S90",
            "make": "Volvo",
            "year": 2024,
            "cost": 55000,
            "saleAmount": 68000,
            "color": "",
            "dateStr": "1/11/2024",
            "vin": "YV4102PK4J",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 5,
            "type": "New",
            "model": "S60",
            "make": "Volvo",
            "year": 2024,
            "cost": 40000,
            "saleAmount": 51500,
            "color": "",
            "dateStr": "1/20/2024",
            "vin": "YV4A22LK6Q",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 7,
            "type": "New",
            "model": "V60",
            "make": "Volvo",
            "year": 2024,
            "cost": 42000,
            "saleAmount": 53000,
            "color": "",
            "dateStr": "1/24/2024",
            "vin": "YV4A22PK8X",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 8,
            "type": "New",
            "model": "XC90",
            "make": "Volvo",
            "year": 2024,
            "cost": 60000,
            "saleAmount": 73500,
            "color": "",
            "dateStr": "1/15/2024",
            "vin": "YV4102KK7M",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 9,
            "type": "New",
            "model": "XC60",
            "make": "Volvo",
            "year": 2024,
            "cost": 45000,
            "saleAmount": 57000,
            "color": "",
            "dateStr": "1/7/2024",
            "vin": "YV4102LK9K",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 10,
            "type": "New",
            "model": "XC40",
            "make": "Volvo",
            "year": 2024,
            "cost": 35000,
            "saleAmount": 46000,
            "color": "",
            "dateStr": "1/28/2024",
            "vin": "YV4A22PK6V",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 11,
            "type": "New",
            "model": "S90",
            "make": "Volvo",
            "year": 2024,
            "cost": 55000,
            "saleAmount": 68500,
            "color": "",
            "dateStr": "1/19/2024",
            "vin": "YV4102PK8X",
            "leaseAmount": null,
            "tradeAmount": null,
        },
        {
            "id": 12,
            "type": "New",
            "model": "S60",
            "make": "Volvo",
            "year": 2024,
            "cost": 40000,
            "saleAmount": 52000,
            "color": "",
            "dateStr": "1/2/2024",
            "vin": "YV4A22LK3K",
            "leaseAmount": null,
            "tradeAmount": null,
        },
    ]

    return (
        <div className="space-y-3">
            <Title size={'md'}>Top Selling Models</Title>
            <Table>
                <TableHeader>
                    <TableRow className="!border-b-0">
                        <TableHead>Make</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Sale Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>VIN</TableHead>
                        <TableHead>Lease Amount</TableHead>
                        <TableHead>Trade Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salesReport?.length ? salesReport?.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>{sale.make}</TableCell>
                                <TableCell>{sale.model}</TableCell>
                                <TableCell> <Badge variantType="translucent"
                                                   translucent={sale.type === "New" ? 'success' : "warning"}>
                                    {sale.type}
                                </Badge></TableCell>
                                <TableCell>{isNullOrUndefinedOrEmpty(sale.color) ? '-' : sale.color}</TableCell>
                                <TableCell>{sale.year}</TableCell>
                                <TableCell>${sale.cost?.toFixed(2)}</TableCell>
                                <TableCell>${sale.saleAmount?.toFixed(2)}</TableCell>
                                <TableCell>{sale.dateStr}</TableCell>
                                <TableCell>{sale.vin}</TableCell>
                                <TableCell>
                                    {sale.leaseAmount ? "$" + sale.leaseAmount : "-"}
                                </TableCell>
                                <TableCell>
                                    {sale.tradeAmount ? "$" + sale.tradeAmount : "-"}
                                </TableCell>
                            </TableRow>
                        ))
                        : <TableRow>
                            <TableCell colSpan={11} className="w-full">
                                <EmptyState/>
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </div>
    )
}