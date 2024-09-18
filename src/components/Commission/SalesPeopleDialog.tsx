import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader, DialogTitle,
} from "../ui/dialog";
import {ISalesPeopleDialog} from "@/interfaces/ISalesPeopleDialog";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import {Label} from "@/components/ui/label";
import {Title} from "@/components/ui/title";

const SalesPeopleDialog: React.FC<ISalesPeopleDialog> = ({
                                                             isSalesPeopleDialogOpen,
                                                             clearSalesPeopleDialog,
                                                             salesPeople,
                                                             commission
                                                         }) => {
    return (
        <>
            <Dialog
                open={isSalesPeopleDialogOpen}
                onOpenChange={clearSalesPeopleDialog}
            >
                <DialogContent className="w-full max-w-[500px]">
                    <DialogHeader>
                        <div className="flex gap-4 items-center">
                            <div>
                                <CircularIcon>{Icons.person(20, 20)}</CircularIcon>
                            </div>
                            <DialogTitle>Sales Person</DialogTitle>
                        </div>
                    </DialogHeader>
                    <div className="p-4 md:p-6 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto tiny-scrollbar">
                            <Title className="text-title-lg font-semibold text-100">
                                Sales Personnel for the sale of {commission?.year} {commission?.make} on {commission?.dateStr}
                            </Title>
                        <div>
                            {salesPeople && salesPeople.length > 0 ? (
                                salesPeople.map((salesPerson) => (
                                    <Label key={salesPerson.id}
                                           className="block text-100 py-4 border-b border-gray-200">
                                        {salesPerson.employeeName}
                                    </Label>
                                ))
                            ) : (
                                <Label className="block text-100 py-4">
                                    No other sales people were associated with this sale.
                                </Label>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SalesPeopleDialog;
