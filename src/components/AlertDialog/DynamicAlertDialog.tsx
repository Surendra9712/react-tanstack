import { AlertDialogContext } from "@/context/AlertContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useCallback, useContext } from "react";

const DynamicAlertDialog = () => {
  const { alertProps, closeAlert } = useContext(AlertDialogContext);

  const handleClose = useCallback(() => {
    alertProps.closeHandle?.();
    closeAlert();
  }, [alertProps.closeHandle, closeAlert]);

  const handleCancel = useCallback(() => {
    alertProps.cancelHandle?.();
    closeAlert();
  }, [alertProps.cancelHandle, closeAlert]);

  //if (!alertProps.isOpen) return null;

  // Implement the UI for your alert dialogue here
  return (
    <AlertDialog open={alertProps.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertProps.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertProps.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {alertProps.cancelHandle &&
            (alertProps.showCancel ? (
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
            ) : null)}
          {alertProps.showContinue ? (
            <AlertDialogAction onClick={handleClose}>
              Continue
            </AlertDialogAction>
          ) : null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DynamicAlertDialog;
