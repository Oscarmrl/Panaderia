import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
