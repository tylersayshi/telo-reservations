'use client';

import { useRouter_UNSTABLE } from 'waku';

import { ColumnDef } from '@tanstack/react-table';
import { Reservation } from '../types';
import { DataTable } from './ui/data-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';

const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: 'receipt',
    size: 60,
    header: 'Stripe Receipt',
  },
  {
    accessorKey: 'number',
    size: 60,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Pre-Order Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'use',
    size: 60,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Use
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'date',
    size: 60,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export function TeloTable({ rows }: { rows: Reservation[] }) {
  return <DataTable columns={columns} data={rows} />;
}
