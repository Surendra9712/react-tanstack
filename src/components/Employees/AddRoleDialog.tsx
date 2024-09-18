import React, {MouseEvent, useState} from "react";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Card,
    CardContent,
} from "../ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {IAddRoleDialog} from "@/interfaces/IAddRoleDialog";
import useEmployees from "@/hooks/use-employees";
import {Icons} from "@/components/icons";
import {CircularIcon} from "@/components/ui/icon";

const AddRoleDialog: React.FC<IAddRoleDialog> = ({
                                                     isAddRoleDialogOpen,
                                                     clearAddRoleDialog,
                                                     handleAddRole,
                                                     employee,
                                                     employeeRoles,
                                                     roleRef,
                                                     field,
                                                 }) => {
    const {GetRoles} = useEmployees();
    const {
        data: roles,
        isLoading: currentRolesIsLoading,
        error: currentRolesError,
    } = GetRoles();
    const [selectedRole, setSelectedRole] = useState<string>("");

    const handleAddRoleClick = (e:MouseEvent) => {
        if(!selectedRole){
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (handleAddRole) handleAddRole(selectedRole.toString());
        setSelectedRole("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button
                    size={"sm"}
                    type="button"
                >
                    {Icons.plus()}
                    Add New
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px]">
                <DialogHeader>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CircularIcon>{Icons.addCircle(20, 20)}</CircularIcon>
                        </div>
                        <DialogTitle>Add Role</DialogTitle>
                    </div>
                </DialogHeader>
                <Card className="border-0">
                    <CardContent className="space-y-1 p-4 md:p-6">
                        <Label htmlFor="role" weight="medium">Employee's Role:</Label>
                        <div id="rolesDdl">
                            <Select value={selectedRole} onValueChange={setSelectedRole}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employee's role" ref={roleRef}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {roles &&
                                        roles.map((role) => {
                                            if (
                                                // employeeRoles &&
                                                // !employeeRoles.includes(role)
                                                !field?.getValue()?.includes(role.id.toString())
                                            ) {
                                                return (
                                                    <SelectItem
                                                        key={role.id}
                                                        value={role.id.toString()}
                                                    >
                                                        {role.name}
                                                    </SelectItem>
                                                );
                                            }
                                            return null;
                                        })}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>

                </Card>
                <DialogFooter>
                    <DialogClose asChild={true}>
                        <Button
                            variant={'outline'}
                            shade={'gray'}
                            type={"button"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild={true}>
                        <Button
                            type={"button"}
                            disabled={currentRolesIsLoading}
                            onClick={(e) => {
                                handleAddRoleClick(e);
                            }}>
                            Add
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddRoleDialog;
