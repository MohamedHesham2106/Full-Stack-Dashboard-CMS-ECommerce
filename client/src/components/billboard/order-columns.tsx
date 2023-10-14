import { ColumnDef } from "@tanstack/react-table";

export type OrderColumns = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const Columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
