import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { neobrutalism } from "@clerk/themes";

import { HomeScreen } from "@/pages/(root)/index.tsx";
import { LoginScreen } from "@/pages/(auth)/LoginScreen.tsx";
import { RegisterScreen } from "@/pages/(auth)/RegisterScreen.tsx";
import { DashboardScreen } from "@/pages/(dashboard)/dashboard";
import { DashboardLayout } from "@/pages/(dashboard)/layout";
import { ProtectedRoute } from "@/components/providers/protected-route-provider.tsx";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { RootLayout } from "@/pages/(root)/layout";
import {
  BillboardScreen,
  BillboardsScreen,
  CategoriesScreen,
  CategoryScreen,
  ColorScreen,
  ColorsScreen,
  OrdersScreen,
  ProductScreen,
  ProductsScreen,
  SettingsScreen,
  SizeScreen,
  SizesScreen,
} from "@/pages/(dashboard)/index";
import { ThemeProvider } from "./components/providers/theme-provider";

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
          socialButtonsVariant: "iconButton",
        },
      }}
      navigate={(to) => navigate(to)}
      publishableKey={clerkPubKey}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
                        <Route path="settings" element={<SettingsScreen />} />
                        <Route
                          path="billboards"
                          element={<BillboardsScreen />}
                        />
                        <Route
                          path="billboards/:billboardId"
                          element={<BillboardScreen />}
                        />
                        <Route
                          path="categories"
                          element={<CategoriesScreen />}
                        />
                        <Route
                          path="categories/:categoryId"
                          element={<CategoryScreen />}
                        />
                        <Route path="sizes" element={<SizesScreen />} />
                        <Route path="sizes/:sizeId" element={<SizeScreen />} />
                        <Route path="colors" element={<ColorsScreen />} />
                        <Route
                          path="colors/:colorId"
                          element={<ColorScreen />}
                        />
                        <Route path="products" element={<ProductsScreen />} />
                        <Route
                          path="products/:productId"
                          element={<ProductScreen />}
                        />
                        <Route path="orders" element={<OrdersScreen />} />
                      </Routes>
                    </DashboardLayout>
                  )}
                />
              }
            />
            <Route path="/sign-in" element={<LoginScreen />} />
            <Route path="/sign-up" element={<RegisterScreen />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
export default App;
