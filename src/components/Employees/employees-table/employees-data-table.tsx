import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import { Input } from "@/components/ui/input";
import React, {useEffect, useRef, useState} from "react";
import {Icons} from "@/components/icons";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import TableSkeleton from "@/components/ui/TableSkeleton";
import AdminWrapper from "@/auth/components/AdminWrapper";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?:boolean,
  handleAdd?:() => void
}

function EmpDataTable<TData, TValue>({
  columns,
  data,
    isLoading,
    handleAdd
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState<number>(124);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });


  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    if (headerRef.current) {
      const element = headerRef.current as HTMLElement
      const defaultHeight = window.innerWidth > 768 ? 124 : 130;
      const newHeight = defaultHeight + element.clientHeight;
      setHeaderHeight(newHeight);
    }
  }

  return (
    <>
      <CardHeader ref={headerRef} className="flex-row gap-4 justify-between flex-wrap">
        <CardTitle>Employees</CardTitle>
        <div className="flex md:justify-end items-center gap-4 flex-wrap">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">{Icons.person()}</span>
            <Input
                placeholder="Search employee"
                value={
                    (table.getColumn("employeeName")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    table.getColumn("employeeName")?.setFilterValue(event.target.value)
                }
                className="max-w-sm pl-9"
            />
          </div>
            <AdminWrapper>
              <Button
                  onClick={handleAdd}
              >
                {Icons.plus(20,20)}
                Add New
              </Button>
            </AdminWrapper>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Table style={{maxHeight: `calc(100vh - ${headerHeight}px)`}}>
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="!border-b-0">
                  {headerGroup.headers.map((header) => {
                    return (
                        <TableHead className="py-0" key={header.id}>
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
            {isLoading?<TableSkeleton/> : <>{table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                      <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                              )}
                            </TableCell>
                        ))}
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
              )}</>}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}

export default EmpDataTable;
