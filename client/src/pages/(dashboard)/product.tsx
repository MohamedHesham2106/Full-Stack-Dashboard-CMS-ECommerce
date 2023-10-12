import { ProductForm } from "@/components/forms/product-form";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const ProductScreen = () => {
  const { productId, storeId } = useParams();

  // Define individual queries
  const productQuery = useQuery(["product", productId], async () => {
    if (productId === "new") {
      // Return an empty object or any default data for a new billboard
      return {};
    }

    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data.data;
  });

  const categoriesQuery = useQuery(["categories", storeId], async () => {
    const response = await axiosInstance.get("/categories", {
      params: {
        storeId,
      },
    });
    return response.data.data;
  });

  const sizesQuery = useQuery(["sizes", storeId], async () => {
    const response = await axiosInstance.get("/sizes", {
      params: {
        storeId,
      },
    });
    return response.data.data;
  });

  const colorsQuery = useQuery(["colors", storeId], async () => {
    const response = await axiosInstance.get("/colors", {
      params: {
        storeId,
      },
    });
    return response.data.data;
  });

  // Check if all queries have successfully loaded
  const isLoading =
    productQuery.isLoading ||
    categoriesQuery.isLoading ||
    sizesQuery.isLoading ||
    colorsQuery.isLoading;
  let initialData = null;
  if (productQuery.data)
    initialData =
      Object.keys(productQuery.data).length === 0 ? null : productQuery.data;
  // Render the ProductForm component when all queries have loaded
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!isLoading && (
          <ProductForm
            initialData={initialData}
            categories={categoriesQuery.data}
            sizes={sizesQuery.data}
            colors={colorsQuery.data}
          />
        )}
      </div>
    </div>
  );
};
