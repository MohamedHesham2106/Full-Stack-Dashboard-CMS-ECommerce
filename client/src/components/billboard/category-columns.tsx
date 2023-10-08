import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel?: string;
  createdAt: string;
};

export const Columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} type="category" />,
  },
];
