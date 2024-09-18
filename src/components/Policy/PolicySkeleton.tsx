import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export default function PolicySkeleton() {
    return (
        <>
            {[1, 2, 3, 4].map((value) =>
                (
                    <div key={value} className="flex gap-2 p-3 border-b items-center justify-between">
                        <Skeleton className='h-4 w-full max-w-96'/>
                        <div className="flex gap-2">
                            <Skeleton className='h-8 w-8'/>
                            <Skeleton className='h-8 w-8'/>
                        </div>
                    </div>
                )
            )}</>
    )
}