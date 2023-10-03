import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  Component: React.FC;
}

export function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    // Show a loading indicator or fallback while authentication is being loaded.
    return null;
  }

  if (!userId) {
    // Redirect to the sign-in page if the user is not authenticated.
    return <Navigate to="/sign-in" />;
  }

  // Render the protected component if the user is authenticated and loading is complete.
  return <Component />;
}
