import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import useSales from "@/hooks/use-sales";
import React from "react";
import SalesChartComponent from "@/components/SalesLog/SalesChart";

function RecentSalesChart() {
    const {GetRecentSales} = useSales();
    const {isLoading, data} = GetRecentSales();

    return (
        <Card className="flex flex-col gap-3 border">
            <CardHeader>
                <CardTitle>Total Sales Amount and Count by Month</CardTitle>
                <CardDescription>
                    A chart (line or bar) showing the total sales amount and number of
                    sales for each of the last 12 months.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <SalesChartComponent data={data} isLoading={isLoading}/>
            </CardContent>
        </Card>
    );
}

export default RecentSalesChart;
