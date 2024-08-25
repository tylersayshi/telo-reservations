'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { use, useEffect, useRef, useState } from 'react';
import { useRouter_UNSTABLE } from 'waku';
import { Reservation } from '../../types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Reservation, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter_UNSTABLE();

  const receipt = router.hash.split('#')[1];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const parentRef = useRef<HTMLTableSectionElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    estimateSize: () => 60,
    overscan: 10,
    getScrollElement: () => parentRef.current,
  });

  useEffect(() => {
    if (receipt && parentRef.current) {
      const rowIndex = data.findIndex((row) => row.receipt === receipt);
      if (rowIndex !== -1) {
        virtualizer.scrollToIndex(rowIndex, {
          align: 'start',
          behavior: 'smooth',
        });
      }
    }
  }, [receipt]);

  return (
    <div
      className="relative max-h-[85vh] overflow-auto rounded-lg border-2 border-solid border-black/20 dark:border-white/20"
      ref={parentRef}
    >
      <div style={{ height: virtualizer.getTotalSize() }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = table.getRowModel().rows[virtualRow.index]!;
                return (
                  <TableRow
                    key={`${virtualRow.index}-${index}`}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start - index * virtualRow.size
                      }px)`,
                    }}
                    onClick={() => router.replace(`#${row.original.receipt}`)}
                    data-state={
                      receipt === row.original.receipt ? 'selected' : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
