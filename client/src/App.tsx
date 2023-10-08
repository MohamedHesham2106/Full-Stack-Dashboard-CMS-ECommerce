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
import { Settings } from "@/pages/(dashboard)/settings";
import { Billboards } from "@/pages/(dashboard)/billboards";
import { Billboard } from "@/pages/(dashboard)/billboard";
import { Categories } from "@/pages/(dashboard)/categories";
import { Category } from "@/pages/(dashboard)/category";
import { Size } from "@/pages/(dashboard)/size";
import { Sizes } from "@/pages/(dashboard)/sizes";
import { Colors } from "./pages/(dashboard)/colors";
import { Color } from "./pages/(dashboard)/color";
import { Products } from "./pages/(dashboard)/products";
import { Product } from "./pages/(dashboard)/product";

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
                      <Route path="billboards" element={<Billboards />} />
                      <Route
                        path="billboards/:billboardId"
                        element={<Billboard />}
                      />
                      <Route path="categories" element={<Categories />} />
                      <Route
                        path="categories/:categoryId"
                        element={<Category />}
                      />
                      <Route path="sizes" element={<Sizes />} />
                      <Route path="sizes/:sizeId" element={<Size />} />
                      <Route path="colors" element={<Colors />} />
                      <Route path="colors/:colorId" element={<Color />} />
                      <Route path="products" element={<Products />} />
                      <Route path="products/:productId" element={<Product />} />
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
