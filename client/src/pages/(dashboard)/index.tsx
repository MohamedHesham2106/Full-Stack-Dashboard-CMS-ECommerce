import axiosInstance from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const DashboardScreen: React.FC = () => {
  const { storeId } = useParams();
  const { userId } = useAuth();
  const { data } = useQuery(["store", storeId], async () => {
    const response = await axiosInstance.get(`/store/${storeId}`, {
      params: {
        userId,
      },
    });
    return response.data.data;
  });
  return <div>{data?.name}</div>;
};
