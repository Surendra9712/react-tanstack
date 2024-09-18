import { useMsal } from "@azure/msal-react";
import useAxios from "./use-axios";
import { useLocalStorage } from "./use-local-storage";
import { LOGIN_ENDPOINT } from "@/api-config";

function useAuth() {
  const { instance } = useMsal();
  const axiosWithAuth = useAxios(true);
  const {
    setUserData,
    getUserInfo,
    setUserInfo,
    clearUser: clearUserFromLocalStorage,
  } = useLocalStorage();

  const User = getUserInfo();

  const isAdmin =
    User?.Roles?.includes("CEO") || User?.Roles?.includes("Admin");

  const isManager = isAdmin || User?.NumberOfReportees! > 0;

  const isFinanceManager = User?.Roles?.includes("Finance Manager");
  const isSalesManager = User?.Roles?.includes("Sales Manager");

  const canViewSalesLog = isAdmin || isSalesManager || isFinanceManager;

  return {
    getDisplayName: () => {
      return instance.getActiveAccount()?.name;
    },
    logout: () => {
      instance.logout();
      clearUserFromLocalStorage();
    },
    login: () => {
      clearUserFromLocalStorage();
      axiosWithAuth.post(LOGIN_ENDPOINT).then((response) => {
        if (response.data) {
          if (response.data.userInfo) {
            setUserInfo(response.data.userInfo);
          }

          if (response.data.data) {
            let userData = response.data.data;
            setUserData(userData);
          }
        }
      });
    },
    User,
    isAdmin,
    isManager,
    isFinanceManager,
    canViewSalesLog,
    getDomainName: () => {
      return "peridotsystems.com";
    },
  };
}

export default useAuth;
