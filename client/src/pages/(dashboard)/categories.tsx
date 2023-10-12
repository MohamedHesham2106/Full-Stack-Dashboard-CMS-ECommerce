import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { CategoryColumn } from "@/components/billboard/category-columns";
import { Categories as Category } from "types";
import { CategoryClient } from "@/components/billboard/category-client";

export const CategoriesScreen = () => {
  const { storeId } = useParams();
  const { data: categories, isLoading } = useQuery(
    ["categories", storeId],
    async () => {
      const response = await axiosInstance.get("/categories", {
        params: {
          storeId,
        },
      });
      return response.data.data;
    }
  );
  let formattedCategories: CategoryColumn[] = [];
  if (!isLoading)
    formattedCategories = categories.map((item: Category) => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};
