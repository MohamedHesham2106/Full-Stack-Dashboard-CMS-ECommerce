import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type BillboardColumn = {
  id: string;
  label: number;
  createdAt: string;
};

export const Columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    // Row is object of type BillboardColumn we are working with from @tanstack/react-table
    cell: ({ row }) => <CellAction data={row.original} type="billboard" />,
  },
];
