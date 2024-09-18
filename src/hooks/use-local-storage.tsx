import { UserInfo } from "@/types/UserInfo";
import useLocalStorageListener from "./use-local-storage-listener";

export const userInfoKey = "UserInfoKey";
const userDataKey = "userData";

function updateLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
  // Dispatch an event to notify all listeners of the update
  dispatchUpdateEvent();
}

const dispatchUpdateEvent = () => {
  window.dispatchEvent(new Event("localDataUpdated"));
};

export function useLocalStorage() {
  const listenToUserData = useLocalStorageListener(userDataKey);

  const listenForUserData = () => {
    return listenToUserData;
  };

  const setUserData = (data: string) => {
    updateLocalStorage(userDataKey, data);
  };

  const getUserData = () => {
    return localStorage.getItem(userDataKey);
  };

  const setUserInfo = (data: string) => {
    updateLocalStorage(userInfoKey, data);
  };

  const getUserInfo = (): UserInfo | undefined => {
    let userInfo = localStorage.getItem(userInfoKey);
    if (userInfo) {
      return JSON.parse(userInfo) as UserInfo;
    }
    return undefined;
  };

  const clearUser = () => {
    localStorage.removeItem(userDataKey);
    localStorage.removeItem(userInfoKey);
    dispatchUpdateEvent();
  };

  return {
    setUserData,
    getUserData,
    setUserInfo,
    getUserInfo,
    clearUser,
    listenForUserData,
  };
}
