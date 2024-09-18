import React from "react";
import { Label } from "../ui/label";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogHeader, DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
} from "../ui/card";
import { ILeasedDialog } from "@/interfaces/ILeasedDialog";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";

const LeasedDialog: React.FC<ILeasedDialog> = ({
  isLeasedDialogOpen,
  clearLeasedDialog,
  leasedIncome,
}) => {
  return (
    <>
      <Dialog open={isLeasedDialogOpen} onOpenChange={clearLeasedDialog}>
        <DialogContent className="w-full max-w-[400px]">
          <DialogHeader>
            <div className="flex gap-4 items-center">
              <div>
                <CircularIcon>{Icons.buildingBank(20, 20)}</CircularIcon>
              </div>
              <DialogTitle>Leased</DialogTitle>
            </div>
          </DialogHeader>
          <Card className="md:p-6 p-4">
            <CardContent className="md:px-0 p-0">
              <div className="w-full space-y-1">
                <Label weight="medium">Leased Income</Label>
                <Input
                  disabled
                  type="number"
                  value={leasedIncome||''}
                />
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeasedDialog;
