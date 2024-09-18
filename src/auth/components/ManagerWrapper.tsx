import useAuth from "@/hooks/use-auth";
import React from "react";

function ManagerWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null {
  const { isManager } = useAuth();
  return isManager ? <>{children}</> : null;
}

export default ManagerWrapper;
