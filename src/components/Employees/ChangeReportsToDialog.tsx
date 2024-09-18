import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IChangeReportsToDialog } from "@/interfaces/IChangeReportsToDialog";

const ChangeReportsToDialog: React.FC<IChangeReportsToDialog> = ({
  employee,
  form,
  managers,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const isLoadingManagers = managers === undefined;

  const [selectedValue, setSelectedValue] = useState(
    form.getFieldValue("ManagerId")
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild={true}>
        <Button
          type="button"
          size={"sm"}
          className="bg-yellow-500 text-xs hover:bg-yellow-800 mt-5 mb-0"
          style={{
            fontFamily: "Roboto",
            fontWeight: 800,
            letterSpacing: "1px",
            marginLeft: 10,
          }}
        >
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[500px] max-w-[500px]">
        <DialogHeader></DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Set manager:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="w-3/4">
                <Label htmlFor="reportsTo">
                  {employee?.employeeName} reports to:
                </Label>
                <div id="reportsToDdl" className="border rounded mb-4">
                  <Select
                    value={selectedValue}
                    onValueChange={(value) => {
                      setSelectedValue(value);
                    }}
                    defaultValue={form.state.values.ManagerId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-pick-" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers &&
                        managers!.map((manager) => (
                          <SelectItem
                            key={manager.id}
                            value={manager.id.toString()}
                          >
                            {manager.employeeName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              disabled={isLoadingManagers}
              isLoading={isLoadingManagers}
              size={"sm"}
              className="bg-green-500 hover:bg-green-900 text-white px-3 py-1 text-xs rounded"
              style={{
                fontFamily: "Roboto",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
              onClick={() => {
                form.setFieldValue("ManagerId", selectedValue);
                setDialogOpen(false);
              }}
            >
              Save
            </Button>
            <DialogClose asChild={true}>
              <Button
                size={"sm"}
                type="button"
                className="bg-red-500 hover:bg-red-900 text-white px-3 py-1 ml-3 text-xs rounded"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                Cancel
              </Button>
            </DialogClose>
          </CardFooter>
        </Card>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeReportsToDialog;
