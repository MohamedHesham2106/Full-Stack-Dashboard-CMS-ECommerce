import { ColorForm } from "@/components/forms/color-form";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const ColorScreen = () => {
  const { colorId } = useParams();
  const { data: color, isLoading } = useQuery(
    ["color", colorId],
    async () => {
      if (colorId === "new") {
        // Return an empty object or any default data for a new billboard
        return {};
      }
      const response = await axiosInstance.get(`/colors/${colorId}`);
      return response.data.data;
    },
    {
      staleTime: Infinity,
    }
  );
  let initialData = null;
  if (color) initialData = Object.keys(color).length === 0 ? null : color;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!isLoading && <ColorForm initialData={initialData} />}
      </div>
    </div>
  );
};
