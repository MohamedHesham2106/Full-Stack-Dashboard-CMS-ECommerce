import { cn } from "@/lib/utils";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "../ui/button";

export const MobileMainNavigation = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const routes = [
    {
      to: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      to: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      to: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      to: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      to: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      to: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      to: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      to: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={"flex flex-col items-center space-y-4 mt-5"}>
      {routes.map((route) => (
        <Link
          to={route.to}
          key={route.to}
          className={" w-full transition-colors hover:text-primary"}
        >
          <Button
            className={cn(
              "w-full font-medium text-lg p-6",
              route.active
                ? "text-primary dark:text-primary"
                : "text-muted-foreground"
            )}
            variant="ghost"
          >
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
