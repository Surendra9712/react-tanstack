import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

interface ChartSkeletonProps {
    type?: "Bar" | "Line" | "Pie"
}

export default function ChartSkeleton({type = "Bar"}: ChartSkeletonProps) {
    return (
        <>

            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <div className="flex-1 flex flex-col gap-3">
                        {type === "Line" && <div className="space-y-3">
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                            <Skeleton className="h-2"></Skeleton>
                        </div>}
                        {type === "Bar" && <div className="animate-pulse">
                            <div className="flex space-x-4 items-baseline">
                                <Skeleton className="flex-1 h-10"></Skeleton>
                                <Skeleton className="flex-1 h-20"></Skeleton>
                                <Skeleton className="flex-1 h-64"></Skeleton>
                                <Skeleton className="flex-1 h-44"></Skeleton>
                                <Skeleton className="flex-1 h-14"></Skeleton>
                                <Skeleton className="flex-1 h-52"></Skeleton>
                            </div>
                        </div>}
                        {type === "Pie" && <Skeleton className="max-w-48 h-48 rounded-full"></Skeleton>}
                    </div>
                </div>
            </div>
        </>
    )
}