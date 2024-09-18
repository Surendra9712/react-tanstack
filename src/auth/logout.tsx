import useAuth from "@/hooks/use-auth";

function Logout() {
  const { logout } = useAuth();

  logout();
  return <div>Logging out...</div>;
}

export default Logout;
