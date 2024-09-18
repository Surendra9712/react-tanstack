import useAuth from "@/hooks/use-auth";
import React from "react";

function AdminOrSalesManagerWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null {
  const { canViewSalesLog,isAdmin } = useAuth();
  return (canViewSalesLog || isAdmin) ? <>{children}</> : null;
}

export default AdminOrSalesManagerWrapper;
