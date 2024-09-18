import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import setPageTitle from "@/hooks/setPageTitle";
import SalesChartComponent from "@/components/SalesLog/SalesChart";
import {Title} from "@/components/ui/title";
import React from "react";
import ReportTable from "@/components/Report/ReportTable";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Icons} from "@/components/icons";
import SalesByBrand from "@/components/Report/SalesByBrand";

export default function ReportComponent() {
    setPageTitle("Report");
    const dummyData = [
        {
            "month": "January",
            "year": "2024",
            "make": "Mercedes",
            "totalSaleAmount": 53000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "TATA",
            "totalSaleAmount": 57000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "TOYOTA",
            "totalSaleAmount": 68500,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Mahindra",
            "totalSaleAmount": 72000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Tesla",
            "totalSaleAmount": 74000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "BYD",
            "totalSaleAmount": 46500,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 52500,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Deepal",
            "totalSaleAmount": 54000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Rayan",
            "totalSaleAmount": 58000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 69500,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 73000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 75000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 47500,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 53500,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 55000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Used",
            "totalSaleAmount": 33000,
            "carsSold": 1
        },
        {
            "month": "January",
            "year": "2024",
            "make": "Used",
            "totalSaleAmount": 36000,
            "carsSold": 1
        },

        {
            "month": "May",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 1796,
            "carsSold": 19
        },
        {
            "month": "May",
            "year": "2024",
            "make": "Kia",
            "totalSaleAmount": 1958,
            "carsSold": 16
        },
        {
            "month": "March",
            "year": "2024",
            "make": "Kia",
            "totalSaleAmount": 1816,
            "carsSold": 17
        },
        {
            "month": "March",
            "year": "2024",
            "make": "Used",
            "totalSaleAmount": 1043,
            "carsSold": 13
        },
        {
            "month": "February",
            "year": "2024",
            "make": "Volvo",
            "totalSaleAmount": 1354,
            "carsSold": 13
        },
    ]

    const salesPeriod = [
        {
            "id": 2024001,
            "period": "January 2024",
            "month": 1,
            "year": 2024
        },
        {
            "id": 2024009,
            "period": "September 2024",
            "month": 9,
            "year": 2024
        },
        {
            "id": 2024010,
            "period": "October 2024",
            "month": 10,
            "year": 2024
        }
    ]

    return (
        <Card className="border">
            <CardHeader className="flex-row justify-between items-center flex-wrap gap-2">
                <CardTitle>Report</CardTitle>
                <Select>
                    <div className="flex items-center relative">
                        <span className="absolute left-3">{Icons.calendar()}</span>
                        <SelectTrigger className="focus:ring-0 focus:border-gray-200 pl-8">
                            <SelectValue placeholder="Choose period"/>
                        </SelectTrigger>
                    </div>
                    <SelectContent>
                        {salesPeriod &&
                            salesPeriod!.map((commissionPeriod) => (
                                <SelectItem
                                    key={commissionPeriod.id}
                                    value={commissionPeriod.period}
                                >
                                    {commissionPeriod.period}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
                <div
                    className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr),minmax(0,360px)] lg:grid-cols-[minmax(0,1fr),minmax(0,250px)] gap-6">
                    <div className="border p-4 rounded">
                        <div className="flex justify-between flex-wrap items-center mb-4 gap-3">
                            <Title size="md">Total Sales and Count</Title>
                        </div>
                        <SalesChartComponent data={dummyData} isLoading={false} classNames={"aspect-auto h-72"}/>
                    </div>
                    <SalesByBrand/>
                </div>
                <ReportTable/>
            </CardContent>
        </Card>
    )
}