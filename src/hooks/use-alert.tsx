// useAlert.tsx (place this inside the 'src/hooks' directory)
import { AlertDialogContext } from "@/context/AlertContext";
import { useContext } from "react";

const useAlert = () => {
  const { openAlert } = useContext(AlertDialogContext);
  return openAlert;
};

export default useAlert;
