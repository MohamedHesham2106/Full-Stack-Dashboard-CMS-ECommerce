import { SettingsForm } from "@/components/forms/settings-form";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, redirect, useParams } from "react-router-dom";

export const Settings = () => {
  const { storeId } = useParams();
  const { userId } = useAuth();

  const { data } = useQuery(["store", storeId], async () => {
    if (!userId) return redirect("/sign-in");
    const response = await axiosInstance.get(`/store/${storeId}`, {
      params: {
        userId,
      },
    });
    return response.data.data;
  });
  if (!data) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={data} />
      </div>
    </div>
  );
};
