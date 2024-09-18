import { useSearchParams } from "react-router-dom";

export type DialogType = "Create" | "Update";

function useEmployeeSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setDialogParam = (dialogTypes: DialogType | "null") => {
    if (dialogTypes === "null") {
      searchParams.delete("dialog");
    } else {
      searchParams.set("dialog", dialogTypes);
    }
    // Use a new URLSearchParams object to ensure the URL updates correctly
    setSearchParams(new URLSearchParams(searchParams));
  };

  const getDialogParam = searchParams.get("dialog") as DialogType | null;

  const getEmployeeId = searchParams.get("employee") ?? undefined;

  const setEmployeeId = (employee: string | "null") => {
    if (employee === "null") {
      searchParams.delete("employee");
    } else {
      searchParams.set("employee", employee);
    }
    // Use a new URLSearchParams object to ensure the URL updates correctly
    setSearchParams(new URLSearchParams(searchParams));
  };

  return {
    getDialogParam,
    setDialogParam,
    getEmployeeId,
    setEmployeeId,
  };
}

export default useEmployeeSearchParams;
