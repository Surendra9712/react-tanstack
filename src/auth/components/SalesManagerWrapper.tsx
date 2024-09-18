import useAuth from "@/hooks/use-auth";
import React from "react";

function SalesManagerWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null {
  const { canViewSalesLog } = useAuth();
  return canViewSalesLog ? <>{children}</> : null;
}

export default SalesManagerWrapper;
