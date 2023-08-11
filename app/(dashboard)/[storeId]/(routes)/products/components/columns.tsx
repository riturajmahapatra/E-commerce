'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  colorValue: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.colorValue}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.colorValue }}
        />
      </div>
    )
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived'
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
