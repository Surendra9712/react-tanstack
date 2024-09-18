// AlertDialogContext.tsx
import {
  createContext,
  useState,
  useCallback,
  FunctionComponent,
  ReactNode,
} from "react";

type AlertType = "error" | "info" | "warning";

interface IAlertProps {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
  showContinue: boolean;
  showCancel: boolean;
  closeHandle?: () => void;
  cancelHandle?: () => void;
}

interface IAlertContext {
  alertProps: IAlertProps;
  openAlert: (
    type: AlertType,
    title: string,
    message: string,
    showContinue: boolean,
    showCancel: boolean,
    closeHandle?: () => void,
    cancelHandle?: () => void
  ) => void;
  closeAlert: () => void;
}

const defaultState: IAlertProps = {
  isOpen: false,
  type: "info",
  title: "",
  message: "",
  showContinue: true,
  showCancel: true,
  closeHandle: () => {},
  cancelHandle: () => {},
};

export const AlertDialogContext = createContext<IAlertContext>({
  alertProps: defaultState,
  openAlert: () => {},
  closeAlert: () => {},
});

export const AlertDialogProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultState);

  const openAlert = useCallback(
    (
      type: AlertType,
      title: string,
      message: string,
      showContinue: boolean,
      showCancel: boolean,
      closeHandle?: () => void,
      cancelHandle?: () => void
    ) => {
      setAlertProps({
        isOpen: true,
        type,
        title,
        message,
        showContinue,
        showCancel,
        closeHandle,
        cancelHandle,
      });
    },
    []
  );

  const closeAlert = useCallback(() => {
    alertProps.closeHandle?.();
    setAlertProps((prev) => ({ ...prev, isOpen: false }));
  }, [alertProps]);

  return (
    <AlertDialogContext.Provider value={{ alertProps, openAlert, closeAlert }}>
      {children}
    </AlertDialogContext.Provider>
  );
};
