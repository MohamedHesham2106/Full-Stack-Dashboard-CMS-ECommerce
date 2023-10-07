import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type SizeColumn = {
  id: string;
  name: number;
  value: string;
  createdAt: string;
};

export const Columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",

    cell: ({ row }) => <CellAction data={row.original} type="sizes" />,
  },
];
