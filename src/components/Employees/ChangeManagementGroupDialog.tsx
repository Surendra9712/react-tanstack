import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { INotesDialog } from "@/interfaces/INotesDialog";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { IAmountDialog } from "@/interfaces/IAmountDialog";
import { Input } from "../ui/input";
import { IChangeManagementGroupDialog } from "@/interfaces/IChangeManagementGroupDialog";

const ChangeManagementGroupDialog: React.FC<IChangeManagementGroupDialog> = ({ isChangeManagementGroupDialogOpen, clearChangeManagementGroupDialog, handleChangeManagementGroup, employee, managementGroup }) => {
  
  return (
    <>
      <Dialog open={isChangeManagementGroupDialogOpen} onOpenChange={clearChangeManagementGroupDialog}>
          <DialogContent className="min-w-[500px] max-w-[500px]">
          <DialogHeader>
            </DialogHeader>
            <Card>
            <CardHeader>
                  <CardTitle>Add to management group:</CardTitle>
                </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="w-3/4">
                    <Label htmlFor="managementGroup">Employee reporting to {employee.employeeName}:</Label>
                    <div id="managementGroupDdl" className="border rounded mb-4">
                    <Select defaultValue={managementGroup && managementGroup.length > 0 ? managementGroup![0].employeeName : "-pick-"} onValueChange={handleChangeManagementGroup}>
                        <SelectTrigger>
                        <SelectValue placeholder="-pick-" />
                        </SelectTrigger>
                        <SelectContent>
                        {managementGroup && managementGroup!.map((person) => (
                            <SelectItem key={person.id} value={person.employeeName}>
                                {person.employeeName}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
              <Button size={"sm"} className="bg-green-500 hover:bg-green-900 text-white px-3 py-1 text-xs rounded" style={{
                    fontFamily: "Roboto",
                    fontWeight: 800,
                    letterSpacing: "1px"
                  }} onClick={() => handleChangeManagementGroup}>
                  Save
                </Button>
                <Button size={"sm"} className="bg-red-500 hover:bg-red-900 text-white px-3 py-1 ml-3 text-xs rounded" style={{
                    fontFamily: "Roboto",
                    fontWeight: 800,
                    letterSpacing: "1px"
                  }} onClick={() => clearChangeManagementGroupDialog()}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
};

export default ChangeManagementGroupDialog;
