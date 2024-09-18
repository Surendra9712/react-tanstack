import {CartesianGrid, XAxis, Line, LineChart, YAxis} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import React, {Fragment} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ChartLegend from "@/components/Commission/ChartLegend";
import {SalesChart} from "@/components/SalesLog/interfaces/SalesChart";
import ChartSkeleton from "@/components/ui/chart-skeleton";

const activeChartLabels = {
    totalSales: "totalSalesAmount",
    carsSold: "carsSold",
};

interface TransformedData {
    monthYear: string;
    [key: string]: number | string;
}

interface SalesInterface {
    data: SalesChart[] | undefined,
    isLoading: boolean,
    classNames?: string
}

function SalesChartComponent({data, isLoading, classNames}: SalesInterface) {
    const [activeChart, setActiveChart] = React.useState(
        activeChartLabels.carsSold
    );

    const transformedData: TransformedData[] =
        data?.reduce(
            (
                acc: TransformedData[],
                {month, year, make, totalSaleAmount, carsSold}
            ) => {
                const monthYear = `${month.slice(0, 3)}-${year}`;
                let monthData = acc.find((item) => item.monthYear === monthYear);
                if (!monthData) {
                    monthData = {monthYear};
                    acc.push(monthData);
                }
                if (activeChart === activeChartLabels.totalSales) {
                    monthData[make] = totalSaleAmount;
                } else if (activeChart === activeChartLabels.carsSold) {
                    monthData[make] = carsSold;
                }
                return acc;
            },
            []
        ) ?? [];
    const uniqueCommissionTypes = Array.from(
        new Set(data?.map((item) => item.make))
    );
    const chartConfig = uniqueCommissionTypes.reduce((acc, type, index) => {
        acc[type] = {
            label: type,
            color: `var(--chart-${index + 1})`,
        };
        return acc;
    }, {} as { [key: string]: { label: string; color: string } });
    return (
        <div className="flex flex-col gap-3">
            <Tabs
                defaultValue="profile"
                value={activeChart}
                onValueChange={setActiveChart}
            >
                <TabsList>
                    <TabsTrigger className="sm:w-[120px] w-20"
                                 value={activeChartLabels.totalSales}>Sales</TabsTrigger>
                    <TabsTrigger className="sm:w-[120px] w-20"
                                 value={activeChartLabels.carsSold}>Amount</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="mt-4">
                {!isLoading && data && (
                    <Fragment>
                        <div className="overflow-x-auto no-scrollbar">
                            <ChartContainer config={chartConfig} className={`min-w-[500px] ${classNames}`}>
                                <LineChart
                                    accessibilityLayer
                                    margin={{left: -10, right: 10}}
                                    data={transformedData}>
                                    <CartesianGrid strokeDasharray={3} vertical={false}/>
                                    <XAxis
                                        dataKey="monthYear"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        strokeWidth={0}
                                        tick={{fill: "#8884d8"}}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot"/>}
                                    />
                                    {Object.entries(chartConfig).map(([key, value]) => (
                                        <Line
                                            key={key}
                                            dataKey={key}
                                            type="linear"
                                            stroke={value.color}
                                            strokeWidth={2}
                                            dot={false}
                                            yAxisId={"left"}
                                        />
                                    ))}
                                </LineChart>

                            </ChartContainer>
                        </div>
                        <ChartLegend legend={Object.values(chartConfig)}/>
                    </Fragment>
                )}
            </div>
            {isLoading && <ChartSkeleton type={'Line'}/>}
        </div>
    );
}

export default SalesChartComponent;
