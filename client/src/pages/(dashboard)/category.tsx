import { CategoryForm } from "@/components/forms/category-form";
import axiosInstance from "@/lib/axios";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const Category = () => {
  const { categoryId, storeId } = useParams();
  const result = useQueries({
    queries: [
      {
        queryKey: ["category", categoryId],
        queryFn: async () => {
          if (categoryId === "new") {
            // Return an empty object or any default data for a new billboard
            return {};
          }

          const response = await axiosInstance.get(`/categories/${categoryId}`);

          return response.data.data;
        },
      },
      {
        queryKey: ["billboards", storeId],
        queryFn: async () => {
          const response = await axiosInstance.get("/billboard", {
            params: {
              storeId,
            },
          });

          return response.data.data;
        },
      },
    ],
  });
  let initialData = null;
  if (result.length > 0) {
    initialData =
      result[0].data && Object.keys(result[0].data).length > 0
        ? result[0].data
        : null;
  }
  const isLoading = !result[0].isLoading && !result[1].isLoading;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {isLoading && (
          <CategoryForm billboards={result[1].data} initialData={initialData} />
        )}
      </div>
    </div>
  );
};
