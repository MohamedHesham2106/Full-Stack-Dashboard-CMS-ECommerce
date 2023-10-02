/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@clerk/clerk-react";
import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  Component: React.FC;
}
export function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { userId } = useAuth();
  return (
    <Fragment>
      {userId && <Component />}
      {!userId && <Navigate to={"/sign-in"} />}
    </Fragment>
  );
}
