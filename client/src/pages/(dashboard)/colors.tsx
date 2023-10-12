import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ColorColumn } from "@/components/billboard/color-columns";
import { ColorClient } from "@/components/billboard/color-client";

export const ColorsScreen = () => {
  const { storeId } = useParams();
  const { data: colors, status } = useQuery(["colors", storeId], async () => {
    const response = await axiosInstance.get("/colors", {
      params: {
        storeId,
      },
    });
    return response.data.data;
  });
  let formattedSizes: ColorColumn[] = [];
  if (status === "success")
    formattedSizes = colors.map((item: ColorColumn) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedSizes} />
      </div>
    </div>
  );
};
