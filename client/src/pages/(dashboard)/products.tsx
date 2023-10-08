import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import axiosInstance from "@/lib/axios";
import { ProductClient } from "@/components/billboard/product-client";
import { formatter } from "@/lib/utils";
import { ProductColumn } from "@/components/billboard/product-columns";
import { Product } from "types";
import { useAuth } from "@clerk/clerk-react";

export const Products = () => {
  const { storeId } = useParams();
  const { userId } = useAuth();
  const { data: products, status } = useQuery(
    ["products", storeId],
    async () => {
      const response = await axiosInstance.get("/products", {
        params: {
          storeId,
          userId,
        },
      });
      return response.data.data;
    }
  );
  let formattedProducts: ProductColumn[] = [];
  if (status === "success")
    formattedProducts = products.map((item: Product) => ({
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(Number(item.price)),
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};
