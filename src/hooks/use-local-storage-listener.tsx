import { useState, useEffect } from "react";

function useLocalStorageListener(key: string): string | null {
  const [value, setValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check the event key to update only if it's the correct key
      if (event.key === key) {
        setValue(localStorage.getItem(key));
      }
    };

    const handleLocalChange = () => {
      // Directly update the value as there's no event.key to check
      setValue(localStorage.getItem(key));
    };

    // This event listener is triggered by changes to localStorage from other tabs
    window.addEventListener("storage", handleStorageChange);

    // Custom event for updates in the same tab
    window.addEventListener("localDataUpdated", handleLocalChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localDataUpdated", handleLocalChange);
    };
  }, [key]);

  return value;
}

export default useLocalStorageListener;
