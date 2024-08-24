'use client';

import { useEffect, useRef } from 'react';
import { cn } from '../utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import { useRouter_UNSTABLE } from 'waku';

export function TeloTable({
  rows,
  headerRow,
}: {
  rows: [string, string, string, string][];
  headerRow: [string, string, string, string];
}) {
  const router = useRouter_UNSTABLE();

  const receipt = router.hash.split('#')[1];

  const parentRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (receipt && parentRef.current) {
      const receiptElement = document.getElementById(receipt);
      if (receiptElement && parentRef.current) {
        scrollParentToChild(parentRef.current, receiptElement);
      }
    }
  }, [receipt]);

  return (
    <Table className="relative">
      <TableHeader className="sticky top-0 block">
        <TableRow>
          {headerRow.map((header, index) => (
            <TableHead key={header} className={cn('w-64', index > 0 && 'px-1')}>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="block max-h-[85vh] overflow-auto" ref={parentRef}>
        {rows.map((row, index) => (
          <TableRow
            key={`${row[0]}-${index}`}
            data-state={row[0] === receipt ? 'selected' : undefined}
            onClick={() => router.replace(`#${row[0]}`)}
          >
            {row.map((cell, index) => (
              <TableCell
                key={`${cell}-${index}`}
                className={cn('w-64', index > 0 && 'ml-4 px-1')}
                id={index === 0 ? cell : undefined}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function scrollParentToChild(parent: HTMLElement, child: HTMLElement) {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  // Adjust the parent's scrollTop to position the child at the top of the parent
  parent.scrollTop += childRect.top - parentRect.top;
}
