import { SizeForm } from "@/components/forms/size-form";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const Size = () => {
  const { sizeId } = useParams();
  const { data: size, isLoading } = useQuery(
    ["size", sizeId],
    async () => {
      if (sizeId === "new") {
        // Return an empty object or any default data for a new billboard
        return {};
      }
      const response = await axiosInstance.get(`/sizes/${sizeId}`);
      return response.data.data;
    },
    {
      staleTime: Infinity,
    }
  );
  let initialData = null;
  if (size) initialData = Object.keys(size).length === 0 ? null : size;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!isLoading && <SizeForm initialData={initialData} />}
      </div>
    </div>
  );
};
