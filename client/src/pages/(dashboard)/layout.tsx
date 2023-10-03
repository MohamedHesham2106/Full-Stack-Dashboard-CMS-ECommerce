import { Navigation } from "@/components/navigation/navigation";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const { userId } = useAuth();
  const { storeId } = useParams();
  const { data, status } = useQuery(["store", storeId], async () => {
    const response = await axiosInstance.get(`/store/${storeId}`, {
      params: {
        userId,
      },
    });
    return response.data.data;
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
        <ServerCrash className="h-10 w-10 my-4" />
        <p className="text-xs">Something went wrong...</p>
      </div>
    );
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  if (!userId) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};
