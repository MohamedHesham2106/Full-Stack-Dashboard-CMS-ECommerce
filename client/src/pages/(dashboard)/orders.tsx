import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { OrderColumns } from "@/components/billboard/order-columns";
import { Order } from "types";
import { OrderClient } from "@/components/billboard/order-client";

export const OrdersScreen = () => {
  const { storeId } = useParams();
  const { data: orders, status } = useQuery(["orders", storeId], async () => {
    const response = await axiosInstance.get("/orders", {
      params: {
        storeId,
      },
    });
    return response.data.data;
  });
  let formattedOrders: OrderColumns[] = [];
  if (status === "success")
    formattedOrders = orders.map((item: Order) => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(", "),
      total: formatter.format(
        item.orderItems.reduce((total, item) => {
          return total + Number(item.product.price);
        }, 0)
      ),
      isPaid: item.isPaid,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};
