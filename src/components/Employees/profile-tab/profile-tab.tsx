import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import AddRoleDialog from "../AddRoleDialog";
import ResetPasswordDialog from "../ResetPasswordDialog";
import useAuth from "@/hooks/use-auth";
import useEmployees from "@/hooks/use-employees";
import useAlert from "@/hooks/use-alert";
import useEmployeeSearchParams from "../hooks/use-employee-search-parms";
import React, {useState} from "react";
import Employee from "@/types/Employee";
import {EmployeeForm} from "@/types/EmployeeForm";
import Role from "@/types/Role";
import PasswordAlertDialog from "../PasswordAlertDialog";
import Department from "@/types/Department";
import {FieldApi, useForm} from "@tanstack/react-form";
import {AxiosError} from "axios";
import FieldError from "@/components/ui/field-error";
import {ContentBody} from "@/components/ui/contentBody";
import {Icons} from "@/components/icons";
import {toast} from "@/components/ui/use-toast";

const trimEmail = (email: string | undefined) => {
    return email?.split("@")[0];
};

const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

function ProfileTab({
                        employeeData,
                        reportsToData,
                        roles,
                        departments,
                        managementGroup,
                    }: {
    employeeData: Employee | undefined;
    reportsToData: Employee | undefined | null;
    roles: Role[] | undefined;
    departments: Department[] | undefined;
    managementGroup: Employee[] | undefined;
}) {
    const alert = useAlert();

    const {getDialogParam, getEmployeeId} = useEmployeeSearchParams();

    const employeeId = Number(getEmployeeId) || undefined;

    const {CreateEmployee, UpdateEmployee, ResetEmployee, GetManagers} =
        useEmployees();

    const {
        data: managers,
        isLoading: isLoadingManagers,
        error: isErrorManagers,
    } = GetManagers();

    const {mutate: mutateResetPassword} = ResetEmployee();

    const {mutateAsync: mutateUpdateAsync, isPending: isUpdatePending} =
        UpdateEmployee();

    const {mutate: mutateCreate, isPending: isCreatePending} = CreateEmployee();

    const {isAdmin, getDomainName} = useAuth();

    const isReadOnly = !isAdmin;

    const emailAddressAssignment = "@" + getDomainName();

    //States
    const [newPassword, setNewPassword] = useState("");
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    const handleSubmitDialog = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(!isReadOnly) {
            form.handleSubmit();
        }
    };

    const getEmail = () => {
        if (!employeeData) {
            return "";
        }
        if (!employeeData.email) {
            return "";
        }
        return trimEmail(employeeData.email) ?? "";
    };

    const form = useForm<EmployeeForm>({
        defaultValues: {
            EmployeeId: getEmployeeId ?? "",
            EmployeeName: employeeData?.employeeName ?? "",
            Email: getEmail(),
            ManagerId: reportsToData?.id?.toString() ?? "",
            DepartmentId: employeeData?.departmentId?.toString() ?? "",
            EmployeeNo: "0",
            UserRoles:
                employeeData?.userRoles?.map((role) => role.id.toString()) ?? [],
        },
        onSubmit: async ({value: employeeForm}) => {
            if(isReadOnly){
                return;
            }
            switch (getDialogParam) {
                case "Create":
                    await mutateCreate(employeeForm, {
                        onSettled(data, error, variables, context) {
                            if (error) {
                                toast({message:"Employee creation failed. "+error.message,toastType:"error"});
                            }
                            if (data) {
                                toast({message:"Employee created successfully."});
                                setPasswordDialogOpen(true);
                                setNewPassword(data.password);
                            }
                        },
                    });

                    break;

                case "Update":
                    await mutateUpdateAsync(employeeForm, {
                        onError(error, variables) {
                            if (
                                error instanceof AxiosError &&
                                error.response?.status === 400
                            ) {
                                const validationErrors = error.response?.data.errors;

                                Object.keys(validationErrors).forEach((field: string) => {
                                    form.state.fieldMeta[field as keyof EmployeeForm].errors =
                                        validationErrors[field];
                                });
                            }
                        },
                        onSettled(data, error, variables, context) {
                            if (error) {
                                toast({message:"Employee update failed. "+error.message,toastType:"error"});
                            }
                            if (data) {
                                toast({message:"Employee updated successfully."});
                            }
                        },
                    });
                    break;
            }
        },
    });

    const setError = (name: keyof EmployeeForm, error: string) => {
        // form.setFieldMeta(name, (prevMeta) => ({
        //   ...prevMeta,
        //   errors: [...(prevMeta.errors || []), error],
        // }));
        form.state.fieldMeta[name].errors = [error];
    };

    const handleAddRole = (role: string) => {
        form.pushFieldValue("UserRoles", role);
    };

    const resetPassword = async () => {
        if (getDialogParam === "Update") {
            //get id of user
            let id = String(employeeId);
            if (id === undefined) {
                return;
            }
            await mutateResetPassword(
                {id: id},
                {
                    onSettled(data, error, variables, context) {
                        if (error) {
                            alert(
                                "error",
                                "Password reset failed",
                                "Password reset failed\n" + error.message,
                                true,
                                false
                            );
                        }
                        if (data) {
                            setPasswordDialogOpen(true);
                            setNewPassword(data.password);
                        }
                    },
                }
            );
        }
    };

    const managerName = () => {
        return (
            <form.Field
                name="ManagerId"
                children={(field) => (
                    <>
            <span>
              {
                  managers?.find((m) => m.id.toString() === field.state.value)
                      ?.employeeName
              }
            </span>
                        {field.getMeta().errors && (
                            <span className="text-red-500 text-xs">
                {field.getMeta().errors[0]}
              </span>
                        )}
                    </>
                )}
            />
        );
    };

    const UserRolesTable = ({
                                field,
                            }: {
        field: FieldApi<any, any, any, any>;
    }) => {
        const getRoleName = (roleId: string) => {
            return roles?.find((r) => r.id.toString() === roleId)?.name;
        };
        return (
            <>
                {field?.state.value?.map((roleId: string, i: number) => (
                    <div key={`tbl_row_${i}`} className="flex justify-between items-center border-b last:border-b-0 py-2">
                        <input
                            name={`UserRoles[${i}]`}
                            id={`UserRoles[${i}]`}
                            defaultValue={roleId}
                            readOnly={true}
                            hidden={true}
                        />
                        <ContentBody className="!text-100">{getRoleName(roleId)}</ContentBody>
                        {!isReadOnly && (
                        <Button
                            size={"icon"}
                            variant={'translucent'}
                            shade={'danger'}
                            type="button"
                            className="w-8 h-8"
                            onClick={() => {
                                field.removeValue(i);
                            }}
                        >
                            {Icons.trash()}
                        </Button>
                        )}
                    </div>
                ))}
            </>
        );
    };

    const saveButtonLoading = isUpdatePending || isCreatePending;
    return (
        <Card>
            <form onSubmit={(e) => handleSubmitDialog(e)}>
                <div className="md:h-[calc(100vh-389px)] h-[calc(100vh-373px)] overflow-y-auto tiny-scrollbar md:space-y-6 space-y-4">
                    <CardHeader className='py-0'>
                        <CardTitle>Employee's Profile</CardTitle>
                        <CardDescription>
                            Make changes to this employee here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-4">
                            <div className="relative space-y-1">
                                <form.Field
                                    name="EmployeeName"
                                    validators={{onChange: ({value}) => !value ? "Full name is required" : undefined}}
                                    children={(field) => (
                                        <>
                                            <Label htmlFor={field.name} weight={'medium'}>Full Name</Label>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                readOnly={isReadOnly}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                maxLength={200}
                                                placeholder={"Enter full name"}
                                                data-error={field.getMeta().errors.length > 0}
                                            />
                                            <FieldError field={field}/>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="relative space-y-1">
                                <form.Field
                                    name="Email"
                                    validators={{onChange: ({value}) => !value ? "Email is required" : undefined}}
                                    children={(field) => (
                                        <>
                                            <Label htmlFor={field.name} weight={'medium'}>Email</Label>
                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    type="text"
                                                    readOnly={isReadOnly}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    maxLength={200}
                                                    placeholder={"Enter your email"}
                                                    data-error={field.getMeta().errors.length > 0}
                                                    className="pr-[200px]"
                                                />
                                                <ContentBody size={'lg'}
                                                             className="absolute right-3 top-1/2 -translate-y-1/2 pl-2 border-l border-100 text-300">{emailAddressAssignment}</ContentBody>
                                            </div>
                                            <FieldError field={field}/>
                                        </>
                                    )}
                                />
                            </div>
                            <div id="departmentDdl" className="space-y-1 relative">
                                <form.Field
                                    name="DepartmentId"
                                    validators={{onChange: ({value}) => !value ? "Department is required" : undefined}}
                                    children={(field) => (
                                        <>
                                            <Label htmlFor={field.name}>Department</Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value) => field.handleChange(value)}
                                                disabled={isReadOnly}
                                            >
                                                <SelectTrigger
                                                    className={field.getMeta().errors.length ? "border-danger-200" : ""}>
                                                    <SelectValue placeholder="Choose department"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments &&
                                                        departments.map((department) => (
                                                            <SelectItem
                                                                key={`dep_${department.id}`}
                                                                value={department.id.toString()}
                                                            >
                                                                {department.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldError field={field}/>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="space-y-1 relative">
                                <form.Field
                                    name="ManagerId"
                                    children={(field) => (
                                        <>
                                            <Label htmlFor={field.name} weight={'medium'}>Reports To</Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value) => field.handleChange(value)}
                                                disabled={isReadOnly}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose manager"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {managers &&
                                                        managers.map((manager) => (
                                                            <SelectItem
                                                                key={manager.id}
                                                                value={manager.id.toString()}
                                                            >
                                                                {manager.employeeName}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 gap-4">
                                <div className="">
                                    <form.Field
                                        name="UserRoles"
                                        children={(field) => (
                                            <>
                                                <div className="flex justify-between h-8">
                                                    <Label weight="medium">Roles</Label>
                                                    {!isReadOnly && (
                                                        <AddRoleDialog
                                                            field={field}
                                                            handleAddRole={handleAddRole}
                                                        />
                                                    )}
                                                </div>
                                                <Card className="rounded border px-4 mt-3">
                                                    {!(roles && field.state.value.length) && (
                                                        <ContentBody className="text-center py-2">No roles found</ContentBody>
                                                    )}
                                                    {roles && <UserRolesTable field={field}/>}
                                                </Card>
                                            </>

                                        )}
                                    />
                                </div>
                                <div>
                                    <Label weight="medium" className="block h-8">Manager Of</Label>
                                    <Card className="rounded border px-4 mt-3">
                                        {managementGroup?.length ?
                                            managementGroup.map((employee) => (
                                                <div key={employee.id} className="border-b last:border-b-0 py-2">
                                                    <ContentBody className="!text-100">{employee.employeeName}</ContentBody>
                                                </div>
                                            )) : <div className="border-b last:border-b-0 py-2">
                                                <ContentBody className="!text-100">No result</ContentBody>
                                            </div>}
                                    </Card>
                                </div>
                            </div>
                            {getDialogParam === "Update" && !isReadOnly && (
                                <ResetPasswordDialog
                                    onClick={resetPassword}
                                    isLoading={saveButtonLoading}
                                />
                            )}
                        </div>
                    </CardContent>
                </div>
                <CardFooter className='border-t justify-end md:p-6 p-4'>
                    <Button
                        type="submit"
                        isLoading={saveButtonLoading}
                    >
                        Save
                    </Button>
                </CardFooter>
            </form>
            {passwordDialogOpen && (
                <PasswordAlertDialog
                    open={passwordDialogOpen}
                    onChange={setPasswordDialogOpen}
                    password={newPassword}
                />
            )}
        </Card>
    );
}

export default ProfileTab;
