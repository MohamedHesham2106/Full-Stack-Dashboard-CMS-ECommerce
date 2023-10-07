import { BillboardForm } from "@/components/forms/billboard-form";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const Billboard = () => {
  const { billboardId } = useParams();
  const { data: billboard, isLoading } = useQuery(
    ["billboard", billboardId],
    async () => {
      if (billboardId === "new") {
        // Return an empty object or any default data for a new billboard
        return {};
      }
      const response = await axiosInstance.get(`/billboard/${billboardId}`);
      return response.data.data;
    },
    {
      staleTime: Infinity,
    }
  );
  let initialData = null;
  if (billboard)
    initialData = Object.keys(billboard).length === 0 ? null : billboard;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!isLoading && <BillboardForm initialData={initialData} />}
      </div>
    </div>
  );
};
