import { SizeColumn } from "@/components/billboard/size-columns";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { SizeClient } from "@/components/billboard/size-client";

export const SizesScreen = () => {
  const { storeId } = useParams();
  const { data: sizes, status } = useQuery(["sizes", storeId], async () => {
    const response = await axiosInstance.get("/sizes", {
      params: {
        storeId,
      },
    });
    return response.data.data;
  });
  let formattedSizes: SizeColumn[] = [];
  if (status === "success")
    formattedSizes = sizes
      ? sizes.map((item: SizeColumn) => ({
          id: item.id,
          name: item.name,
          value: item.value,
          createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
        }))
      : [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};
