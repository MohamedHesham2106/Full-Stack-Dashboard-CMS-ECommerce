import { OverviewCharts } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";
import { formatter } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { useParams } from "react-router-dom";
import { Order } from "types";

export const DashboardScreen: React.FC = () => {
  const { storeId } = useParams();
  const { data: totalRevenue } = useQuery(["paidOrders", storeId], async () => {
    const response = await axiosInstance.get("/orders", {
      params: {
        storeId,
        paidOrders: true,
      },
    });
    const data = response.data.data;
    const totalRev = data.reduce((total: number, order: Order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + Number(item.product.price);
      }, 0);
      return total + orderTotal;
    }, 0);
    return totalRev;
  });
  const { data: orderCount } = useQuery(["orderCount", storeId], async () => {
    const response = await axiosInstance.get("/orders", {
      params: {
        storeId,
        paidOrders: true,
        count: true,
      },
    });
    return response.data.data;
  });
  const { data: stockCount } = useQuery(["stockCount", storeId], async () => {
    const response = await axiosInstance.get("/products", {
      params: {
        storeId,

        count: true,
      },
    });
    return response.data.data;
  });
  const { data: graphData } = useQuery(["graphData", storeId], async () => {
    const response = await axiosInstance.get("/orders", {
      params: {
        storeId,
        paidOrders: true,
        graph: true,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{orderCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-4">
            <OverviewCharts data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
