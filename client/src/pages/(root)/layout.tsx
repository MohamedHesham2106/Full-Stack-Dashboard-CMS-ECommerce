import axiosInstance from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ServerCrash } from "lucide-react";
import toast from "react-hot-toast";
import { Navigate, redirect } from "react-router-dom";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  const { data, status } = useQuery(["store", userId], async () => {
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

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin my-4" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-screen">
        <ServerCrash className="h-7 w-7 my-4" />
        <p className="text-xs">Something went wrong...</p>
      </div>
    );
  }

  if (data.length > 0) {
    return <Navigate to={`/${data[0].id}`} replace />;
  }

  return <>{children}</>;
};
