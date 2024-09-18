import {
    Bar,
    ComposedChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart";
import useCommission from "@/hooks/use-commission";
import {Skeleton} from "@/components/ui/skeleton";
import React, {useEffect, useRef, useState} from "react";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import ChartLegend from "@/components/Commission/ChartLegend";
import chartLegend from "@/components/Commission/ChartLegend";
import {ScrollArea} from "@/components/ui/scroll-area";
import ChartSkeleton from "@/components/ui/chart-skeleton";

interface TransformedData {
    monthYear: string;
    total?: number;

    [key: string]: number | string | undefined;
}

export default function CommissionsChart() {
    const {GetRecentCommissions} = useCommission();
    const {data, isLoading} = GetRecentCommissions();

    const transformedData: TransformedData[] =
        data?.reduce(
            (
                acc: TransformedData[],
                {month, year, commissionType, totalCommission, totalSales}
            ) => {
                const monthYear = `${month.slice(0, 3)}-${year}`;
                let monthData = acc.find((item) => item.monthYear === monthYear);
                if (!monthData) {
                    monthData = {monthYear, total: 0};
                    acc.push(monthData);
                }
                monthData[commissionType] = totalSales;
                monthData.total = totalCommission;
                return acc;
            },
            []
        ) ?? [];

    const uniqueCommissionTypes = Array.from(
        new Set(data?.map((item) => item.commissionType))
    );

    const chartConfig = uniqueCommissionTypes.reduce((acc, type, index) => {
        acc[type] = {
            label: type,
            color: `var(--chart-${index + 1})`,
        };
        return acc;
    }, {} as { [key: string]: { label: string; color: string } });
    const chartLegend = {...chartConfig, ...{total: {label: "Total", color: "var(--primary-500)"}}}
    return (
        <Card className="flex flex-col h-full gap-3 border">
            <CardHeader>
                <CardTitle>Commission</CardTitle>
                <CardDescription>
                    Showing commissions for the last 12 months
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4">
                {isLoading && <ChartSkeleton/>}
                {!isLoading && data && (<div>
                        <div className="overflow-x-auto no-scrollbar">
                            <ChartContainer config={chartConfig} className="min-w-[500px] w-full">
                                <ComposedChart
                                    data={transformedData}
                                    margin={{
                                        right: 10,
                                        bottom: 10,
                                        left: -10,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray={4} vertical={false} stroke="#C3C3C3"/>
                                    <XAxis
                                        dataKey="monthYear"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        label={{
                                            value: "Commissions",
                                            angle: -90,
                                            position: "insideLeft",
                                            offset: 20,
                                        }}
                                        strokeWidth={0}
                                        tick={{fill: "#8884d8"}}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        label={{
                                            value: "Total",
                                            angle: -90,
                                            position: "insideRight",
                                            offset: -5,
                                        }}
                                        strokeWidth={0}
                                        tick={{fill: "#ff7300"}}
                                    />
                                    <Tooltip content={<ChartTooltipContent/>}/>

                                    {Object.entries(chartConfig).map(([key, value]) => (
                                        <Bar
                                            key={key}
                                            dataKey={key}
                                            barSize={12}
                                            fill={value.color}
                                            yAxisId="left"
                                        />
                                    ))}
                                    <Line
                                        dataKey="total"
                                        type="monotone"
                                        stroke="rgba(67, 97, 238, 1)"
                                        strokeWidth={2}
                                        dot={false}
                                        yAxisId="right"
                                    />
                                </ComposedChart>

                            </ChartContainer>
                        </div>
                        <ChartLegend legend={Object.values(chartLegend)}/>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
