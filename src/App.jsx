import React from "react";
import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import { useAuth, AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

const queryClient = new QueryClient();

const ProtectRoute = ({ children }) => {
  const { authUser, isLoggedIn } = useAuth();

  if (isLoggedIn && authUser) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/search"
              element={
                <ProtectRoute>
                  <SearchPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/browse"
              element={
                <ProtectRoute>
                  <BrowsePage />
                </ProtectRoute>
              }
            />
            <Route path="/logout" element={<LoginPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}
