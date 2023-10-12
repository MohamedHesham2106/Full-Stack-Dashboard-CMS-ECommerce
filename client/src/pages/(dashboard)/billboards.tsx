import { BillboardClient } from "@/components/billboard/billboard-client";
import { BillboardColumn } from "@/components/billboard/billboard-columns";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export const BillboardsScreen = () => {
  const { storeId } = useParams();
  const { data: billboards, status } = useQuery(
    ["billboards", storeId],
    async () => {
      const response = await axiosInstance.get("/billboard", {
        params: {
          storeId,
        },
      });
      return response.data.data;
    }
  );
  let formattedBillboards: BillboardColumn[] = [];
  if (status === "success")
    formattedBillboards = billboards.map((item: BillboardColumn) => ({
      id: item.id,
      label: item.label,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};
