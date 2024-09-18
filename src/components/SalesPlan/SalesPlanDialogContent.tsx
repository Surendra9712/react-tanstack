import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle, useRef,
    useState,
} from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CalculateCommissionsDialog from "../Commission/CalcCommissionsDialog";
import AddPlanParticipantsDialog from "./AddPlanParticipantsDialog";
import ParameterExampleDialog from "./ParameterExampleDialog";
import useSalesPlans from "@/hooks/use-salesPlans";
import SalesPlan from "@/types/SalesPlan";
import LogicApp from "@/types/LogicApp";
import Employee from "@/types/Employee";
import {SalesPlanParticipantForm} from "./SalesPlanParticipantForm";
import {ContentBody} from "@/components/ui/contentBody";
import {Icons} from "@/components/icons";
import {toast} from "@/components/ui/use-toast";
import SalesPlanJsonUI from "./SalesPlanJsonUi";
import {useElementDimensions} from "@/hooks/use-emelent-dimension";
import {SalesPlanOptionProvider} from "@/components/SalesPlan/SalesPlanOptionProvider";

interface SalesPlanDialogContentProps {
    planId: number | undefined;
    salesPlans: SalesPlan[] | undefined;
    planTypes: LogicApp[] | undefined;
    participants: Employee[] | undefined;
    refetchSalesPlans: () => void;
    refetchParticipants: () => void;
}

export interface SalesPlanDialogContentHandles {
    onSave: () => Promise<void>;
    onSaveAsNew: () => Promise<void>;
}

const SalesPlanDialogContent = forwardRef<
    SalesPlanDialogContentHandles,
    SalesPlanDialogContentProps
>((props, ref) => {
    const dropdownRef = useRef(null);
    const dimensions = useElementDimensions(dropdownRef.current);
    const [salesPlan, setSalesPlan] = useState<SalesPlan | undefined>(undefined);
    const [planType, setPlanType] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const [jsonParams, setJsonParams] = useState<object>({});
    const [jsonExampleParams, setJsonExampleParams] = useState<string>("");

    const {UpdateSalesPlan, CreateNewFrom, DeletePlanParticipant} =
        useSalesPlans();

    const {mutate: mutateUpdate} = UpdateSalesPlan();
    const {mutate: mutateCreateNewFrom} = CreateNewFrom();
    const {
        mutate: mutateDeletePlanParticipant,
        isPending: isDeletePlanParticipantPending,
    } = DeletePlanParticipant();

    useEffect(() => {
        if (props.planId && props.salesPlans) {
            const plan = props.salesPlans.find((p) => p.id === props.planId);
            setSalesPlan(plan);
            changePlanType(plan?.logicApp?.name!);
            setDescription(plan?.description || "");
            const parsedJson = JSON.parse(plan?.logicAppJsonParameters || "");
            setJsonParams(parsedJson);
        }
    }, [props.planId, props.salesPlans]);

    const onSave = useCallback(async () => {
        const selectedLogicApp = props.planTypes?.find((p) => p.name === planType);
        let formData: SalesPlan = {
            id: props.planId!,
            logicApp: selectedLogicApp,
            description,
            logicAppJsonParameters: JSON.stringify(jsonParams),
        };
        if (salesPlan) {
            await mutateUpdate(formData, {
                onSuccess: () => {
                    props.refetchSalesPlans(); // Refresh sales plans list
                    toast({message: "Sales plan updated successfully"}); // Show success alert
                },
                onError: (errorUpdate: any) => {
                    toast({message: "Error updating sales plan. Please try again.", toastType: 'error'});
                },
            });
        }
    }, [
        props.planId,
        salesPlan,
        description,
        jsonParams,
        mutateUpdate,
        props.refetchSalesPlans,
    ]);

    const onSaveAsNew = useCallback(async () => {
        const selectedLogicApp = props.planTypes?.find((p) => p.name === planType);
        const newSalesPlan: SalesPlan = {
            id: 0,
            description,
            logicApp: selectedLogicApp,
            logicAppJsonParameters: JSON.stringify(jsonParams),
        };

        await mutateCreateNewFrom(newSalesPlan, {
            onSuccess: () => {
                props.refetchSalesPlans(); // Refresh policies list
                toast({message: "Sales Plan created successfully."}); // Show success alert
            },
            onError: (errorCreateNewFrom: any) => {
                toast({message: "Error creating sales plan. Please try again.", toastType: 'error'});
            },
        });
    }, [
        planType,
        props.planTypes,
        description,
        jsonParams,
        mutateCreateNewFrom,
        props.refetchSalesPlans,
    ]);

    useImperativeHandle(ref, () => ({
        onSave,
        onSaveAsNew,
    }));

    const handleDeleteParticipantClick = async (participantId: number) => {
        const participantToDeleteIdx = props.participants?.findIndex(
            (p) => p.id === participantId
        );
        if (
            participantToDeleteIdx !== undefined &&
            participantToDeleteIdx > -1 &&
            props.planId &&
            !isNaN(props.planId)
        ) {
            let formData: SalesPlanParticipantForm = {
                SalesPlanId: props.planId,
                EmployeeId: participantId,
            };
            await mutateDeletePlanParticipant(formData, {
                onSuccess: () => {
                    props.refetchParticipants(); // Refresh participants list
                    toast({message: "Participant deleted successfully."});
                },
                onError: (errorDeletePlanParticipant: any) => {
                    toast({message: "Error deleting participant. Please try again.", toastType: 'error'});
                },
            });
        } else {
            toast({message: "Participant not found.", toastType: 'error'});
        }
    };

    const changePlanType = (planType: string) => {
        setPlanType(planType);
        const jsonSchema = props.planTypes?.find(
            (p) => p.name === planType
        )?.exampleParameter;
        setJsonExampleParams(jsonSchema || "");
    };
    return (
        <Tabs defaultValue="profile"  className="overflow-x-auto md:pt-6 pt-4 md:space-y-6 space-y-4">
            <div className="md:mx-6 mx-4 overflow-x-auto no-scrollbar">
                <TabsList
                    className="grid justify-start md:grid-cols-3 grid-cols-[auto,auto,auto] max-md:gap-3 max-md:bg-transparent max-md:p-0 max-md:h-8">
                    <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary"
                                 value="profile">Profile</TabsTrigger>
                    <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary"
                                 value="planOptions">Plan Options</TabsTrigger>
                    <TabsTrigger className="max-md:border max-md:data-[state=active]:border-primary" value="planParticipants">Plan Participants</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="profile" className="m-0 h-[calc(100vh-400px)] overflow-y-auto tiny-scrollbar">
                <Card className="md:space-y-6 space-y-4">
                    <CardHeader className="py-0">
                        <CardTitle>Profile</CardTitle>
                        <ContentBody>Make changes to this sales plan here. Click save when you are done.</ContentBody>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="planType" weight={'medium'}>Plan Type</Label>
                            <div id="planTypeDdl" ref={dropdownRef}>
                                <Select value={planType} onValueChange={changePlanType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose plan type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.planTypes?.map((planType) => (
                                            <SelectItem key={planType.id} value={planType.name!} style={{maxWidth:dimensions.width+'px'}}>
                                                {planType.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="w-full space-y-1">
                            <Label weight={'medium'}>Description</Label>
                            <Textarea
                                className="min-h-24"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="planOptions"
                         className="m-0 h-[calc(100vh-400px)] overflow-y-auto tiny-scrollbar" id="planOptions">
               <SalesPlanOptionProvider>
                   <SalesPlanJsonUI
                       jsonParams={jsonParams}
                       plan={salesPlan}
                       // schema={}
                       setJsonParams={setJsonParams}
                   />
               </SalesPlanOptionProvider>
            </TabsContent>
            <TabsContent value="planParticipants"
                         className="m-0 h-[calc(100vh-400px)] overflow-y-auto tiny-scrollbar">
                <Card className="space-y-4 md:space-y-6">
                    <CardHeader className="md:flex-row justify-between gap-4 py-0">
                        <div>
                            <CardTitle>Plan Participants</CardTitle>
                            <ContentBody>Make changes to plan participants here. Click save when you are
                                done.</ContentBody>
                        </div>
                        <AddPlanParticipantsDialog/>
                        {/*<CalculateCommissionsDialog/>*/}
                    </CardHeader>
                    <CardContent className="pt-0">
                        <Table>
                            <TableBody>
                                {props.participants?.length ?
                                    props.participants.map((participant) => (
                                        <TableRow key={participant.id}>
                                            <TableCell>{participant.employeeName}</TableCell>
                                            <TableCell className="w-10">
                                                <Button
                                                    size={"icon"}
                                                    className="w-8 h-8"
                                                    variant={"translucent"}
                                                    shade={'danger'}
                                                    onClick={() =>
                                                        handleDeleteParticipantClick(participant.id)
                                                    }
                                                >
                                                    {Icons.trash()}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : <TableRow>
                                        <TableCell colSpan={2} className={'text-center'}>No participants</TableCell>
                                    </TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
});

export default SalesPlanDialogContent;
