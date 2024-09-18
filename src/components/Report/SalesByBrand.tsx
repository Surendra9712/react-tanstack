import {Title} from "@/components/ui/title";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Cell, Label, Pie, PieChart} from "recharts";
import ChartLegend from "@/components/Commission/ChartLegend";
import React, {useEffect, useRef, useState} from "react";

export default function SalesByBrand() {
    const chartRef = useRef(null);
    const [innerRadius, setInnerRadius] = useState(0);
    const salesData = [
        {
            "name": "Group A",
            "value": 24000,
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
    ];

    const uniqueBrand = Array.from(
        new Set(salesData?.map((item) => item.name))
    );
    const chartConfig = uniqueBrand.reduce((acc, name, index) => {
        acc[name] = {
            label: name,
            color: `var(--chart-${index + 1})`,
        };
        return acc;
    }, {} as { [key: string]: { label: string; color: string } });

    const totalValue = salesData?.reduce((sum, item) => sum + item.value, 0);
    const renderCustomLabel = ({viewBox}: any) => {
        const {cx, cy} = viewBox;
        return (
            <g>
                <text x={cx} y={cy} textAnchor="middle"
                      className={`${innerRadius > 80 ? "text-title-lg" : "text-title-md"} font-semibold`}>
                    ${totalValue}
                </text>
                <text x={cx} y={cy + 20} textAnchor="middle"
                      className={`${innerRadius > 80 ? "text-body-md" : "text-body-sm"} text-200 ${innerRadius}`}
                      fill="currentColor">
                    Total Sales Amount
                </text>
            </g>
        );
    };

    useEffect(() => {
        const updateRadius = () => {
            if (chartRef.current) {
                const chartWidth = chartRef.current['offsetWidth'];
                const chartHeight = chartRef.current['offsetHeight'];
                const radius = Math.min(chartWidth, chartHeight) * 0.32;
                setInnerRadius(radius);
            }
        };

        updateRadius(); // Call it on mount
        window.addEventListener('resize', updateRadius); // Add resize listener

        return () => {
            window.removeEventListener('resize', updateRadius); // Cleanup on unmount
        };
    }, []);


    return (
        <div className="border p-4 rounded flex flex-col justify-between">
            <Title size="md" className="mb-2">Sales By Brand</Title>
            <ChartContainer ref={chartRef} config={chartConfig}
                            className="aspect-auto min-h-60 h-full w-full ">
                <PieChart>
                    <Pie data={salesData} cx="50%" cy="50%" dataKey={'value'} innerRadius={innerRadius}>
                        {
                            salesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`var(--chart-${index + 1})`}/>
                            ))
                        }
                        <Label content={renderCustomLabel} position="center"/>
                    </Pie>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot"/>}
                    />
                </PieChart>
            </ChartContainer>
            <ChartLegend legend={Object.values(chartConfig)}/>
        </div>
    )
}