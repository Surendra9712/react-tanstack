import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export default function RecentViewSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex gap-3 justify-between border-b py-2">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full max-w-96"/>
                    <Skeleton className="h-3 w-24"/>
                </div>
                <Skeleton className="h-8 w-8"/>
            </div>
            <div className="flex gap-3 justify-between border-b py-2">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full max-w-96"/>
                    <Skeleton className="h-3 w-24"/>
                </div>
                <Skeleton className="h-8 w-8"/>
            </div>
            <div className="flex gap-3 justify-between border-b py-2">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full max-w-96"/>
                    <Skeleton className="h-3 w-24"/>
                </div>
                <Skeleton className="h-8 w-8"/>
            </div>
            <div className="flex gap-3 justify-between border-b py-2">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full max-w-96"/>
                    <Skeleton className="h-3 w-24"/>
                </div>
                <Skeleton className="h-8 w-8"/>
            </div>
        </div>
    )
}