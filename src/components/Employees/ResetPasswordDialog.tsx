import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import React from "react";
import {HorizontalDivider} from "@/components/ui/divider";
import {ContentBody} from "@/components/ui/contentBody";
function ResetPasswordDialog({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
      <Dialog>
        <div className="flex justify-center items-center gap-1">
          <HorizontalDivider className="flex-auto max-sm:hidden"/>
          <div className="flex-initial flex max-[390px]:flex-col items-center">
            <ContentBody size={'lg'}>Reset employee’s password!</ContentBody>
            <DialogTrigger asChild={true}>
                <Button variant={'subtle'} className="!px-2" size={'sm'}>Reset Password</Button>
            </DialogTrigger>
          </div>
          <HorizontalDivider className="flex-auto max-sm:hidden"/>
        </div>

        <DialogContent>
          <DialogHeader>
            <div className="flex gap-4 items-center">
              <div>
                <CircularIcon>{Icons.plus(20, 20)}</CircularIcon>
              </div>
              <DialogTitle>Reset Password</DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription className="md:p-6 p-4 !text-body-lg">Are you sure you want to reset the
            password?</DialogDescription>
          <DialogFooter>
            <DialogClose asChild={true}>
              <Button
                  variant={'outline'}
                  shade={'gray'}
                  type={"button"}>
                No
              </Button>
            </DialogClose>
            <DialogClose asChild={true}>
              <Button>
                Yes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

export default ResetPasswordDialog;
