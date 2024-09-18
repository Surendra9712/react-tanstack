import useAuth from "@/hooks/use-auth";
import React from "react";

function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : null;
}

export default AdminWrapper;
