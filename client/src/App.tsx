import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { neobrutalism } from "@clerk/themes";

import { DashBoardScreen } from "@/pages/(root)/DashBoardScreen.tsx";
import { LoginScreen } from "@/pages/(auth)/LoginScreen.tsx";
import { RegisterScreen } from "@/pages/(auth)/RegisterScreen.tsx";
import { ProtectedRoute } from "@/components/providers/protected-route-provider.tsx";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ToastProvider } from "./components/providers/toast-provider";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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
      <ToastProvider />
      <ModalProvider />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute Component={DashBoardScreen} />}
        />

        <Route path="/sign-in/*" element={<LoginScreen />} />
        <Route path="/sign-up/*" element={<RegisterScreen />} />
      </Routes>
    </ClerkProvider>
  );
};
export default App;
