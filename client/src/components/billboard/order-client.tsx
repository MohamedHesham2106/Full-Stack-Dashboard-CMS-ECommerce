import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumns, Columns } from "@/components/billboard/order-columns";

interface OrderClientProps {
  data: OrderColumns[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for this store."
      />

      <Separator />
      <DataTable columns={Columns} data={data} searchKey="products" />
    </>
  );
};
