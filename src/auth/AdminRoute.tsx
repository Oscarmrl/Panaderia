import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getAuthUser } from "./authStorage";

type AdminRouteProps = {
  children: ReactNode;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { role } = getAuthUser();
  if (role !== "admin") {
    return <Navigate to="/Panaderia" replace />;
  }

  return children;
}
