import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { neobrutalism } from "@clerk/themes";

import { HomeScreen } from "@/pages/(root)/index.tsx";
import { LoginScreen } from "@/pages/(auth)/LoginScreen.tsx";
import { RegisterScreen } from "@/pages/(auth)/RegisterScreen.tsx";
import { DashboardScreen } from "@/pages/(dashboard)";
import { DashboardLayout } from "@/pages/(dashboard)/layout";
import { ProtectedRoute } from "@/components/providers/protected-route-provider.tsx";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { RootLayout } from "@/pages/(root)/layout";
import { Settings } from "./pages/(dashboard)/settings";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  );
}
const ClerkWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        layout: {
          showOptionalFields: false,
          socialButtonsPlacement: "bottom",

          helpPageUrl: "/help",
          privacyPageUrl: "/privacy",
          termsPageUrl: "/terms",
        },
      }}
      navigate={(to) => navigate(to)}
      publishableKey={clerkPubKey}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ToastProvider />
        <ModalProvider />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                Component={() => (
                  <RootLayout>
                    <HomeScreen />
                  </RootLayout>
                )}
              />
            }
          />
          <Route
            path="/:storeId/*"
            element={
              <ProtectedRoute
                Component={() => (
                  <DashboardLayout>
                    <Routes>
                      <Route index element={<DashboardScreen />} />
                      <Route path="settings" element={<Settings />} />
                    </Routes>
                  </DashboardLayout>
                )}
              />
            }
          />
          <Route path="/sign-in" element={<LoginScreen />} />
          <Route path="/sign-up" element={<RegisterScreen />} />
        </Routes>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
export default App;
