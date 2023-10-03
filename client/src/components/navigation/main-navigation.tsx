import { Link, useLocation, useParams } from "react-router-dom";

import { cn } from "@/lib/utils";

export const MainNavigation = ({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const { pathname } = useLocation();
  const params = useParams();
  const routes = [
    {
      to: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          to={route.to}
          key={route.to}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white "
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
