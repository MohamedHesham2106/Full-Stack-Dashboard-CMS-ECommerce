import { UserButton, useAuth } from "@clerk/clerk-react";

import { MainNavigation } from "@/components/navigation/main-navigation";
import { StoreSwitcher } from "@/components/store-switcher";
import { redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const Navigation = () => {
  const { userId } = useAuth();

  const { data } = useQuery(["store"], async () => {
    if (!userId) return redirect("/sign-in");
    try {
      const response = await axiosInstance.get("/store", {
        params: {
          userId,
        },
      });

      return response.data.data;
    } catch (error) {
      // Handle errors from the API request.
      toast.error("Something went wrong...");
    }
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={data} />
        <MainNavigation className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
