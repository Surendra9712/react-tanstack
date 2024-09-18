import React from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

function TableSkeleton({count = 5}: { count?: number }) {
    const items = [{list: Array.from({length: count})}, {list: Array.from({length: count})}]
    return (
        <>
            {items.map((item, index) => (
                <TableRow key={index}>
                    {item.list.map((value, index) => <TableCell key={index}><Skeleton
                        className="h-6 w-full rounded-none"></Skeleton></TableCell>)}
                </TableRow>
            ))}
        </>
    );
}

export default TableSkeleton;
