import {
    ColumnDef,
    RowSelectionState,
    Updater,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {CSSProperties, useEffect, useState} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    onRowSelection?: (
        table: import("@tanstack/table-core").Table<TData>,
        rowSelection: Updater<RowSelectionState>
    ) => void;
    data: TData[];
    isLoading?: boolean,
    height?: string;
    style?: CSSProperties;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             onRowSelection,
                                             isLoading,
                                             height,
                                             style
                                         }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    // useEffect hook with dependency on state
    useEffect(() => {
        if (onRowSelection) onRowSelection(table, rowSelection);
        //console.log(rowSelection);
    }, [rowSelection]); // Dependency array ensures this effect runs only when state changes

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection, //pass the row selection state back to the table instance
        },
    });

    function onRowSelectionChange(
        rowSelection: Updater<RowSelectionState>
    ): void {
        if (onRowSelection) onRowSelection(table, rowSelection);
    }

    return (
        <Table height={height} style={style}>
            <TableHeader className="sticky top-0 x">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} style={{borderWidth: 0}}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} className={`w-${header.column.columnDef.size}`}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {isLoading ? <TableSkeleton count={columns.length}/> : (<>{table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            className="p-2"
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className={`w-${cell.column.columnDef.size}`}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}</>)}

            </TableBody>
        </Table>
    );
}
