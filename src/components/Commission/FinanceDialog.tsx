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
import { IFinanceDialog } from "@/interfaces/IFinanceDialog";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";

const FinanceDialog: React.FC<IFinanceDialog> = ({
  isFinanceDialogOpen,
  clearFinanceDialog,
  bankFee,
  bankName,
  financeReserve,
}) => {
  return (
    <>
      <Dialog open={isFinanceDialogOpen} onOpenChange={clearFinanceDialog}>
        <DialogContent className="w-full max-w-[400px]">
          <DialogHeader>
            <div className="flex gap-4 items-center">
              <div>
                <CircularIcon>{Icons.buildingBank(20, 20)}</CircularIcon>
              </div>
              <DialogTitle>Finance</DialogTitle>
            </div>
          </DialogHeader>
          <Card className="md:p-6 p-4">
            <CardContent className="space-y-4 md:px-0 p-0">
              <div className="w-full space-y-1">
                <Label weight="medium">Bank Name</Label>
                <Input
                  type="text"
                  disabled
                  value={bankName||''}
                />
              </div>
              <div className="w-full space-y-1">
                <Label weight="medium">Bank Fee</Label>
                <Input
                  disabled
                  type="number"
                  value={bankFee||''}
                />
              </div>
              <div className="w-full space-y-1">
                <Label weight="medium">Finance Reserve</Label>
                <Input
                  disabled
                  type="number"
                  value={financeReserve||''}
                />
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinanceDialog;
