import React from "react";
import {IPolicyViewDialog} from "@/interfaces/IPolicyViewDialog";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
} from "../ui/dialog";
import {HorizontalDivider} from "@/components/ui/divider";
import {Icons} from "@/components/icons";
import {CircularIcon} from "@/components/ui/icon";

const PolicyViewDialog: React.FC<IPolicyViewDialog> = ({
                                                           isViewDialogOpen,
                                                           clearViewDialog,
                                                           currentPolicy
                                                       }) => {
    return (
        <>
            <Dialog open={isViewDialogOpen} onOpenChange={clearViewDialog}>
                <DialogContent className="p-0 gap-0 max-w-[800px] w-full">
                    <DialogHeader className="p-6">
                        <div className="flex gap-4 items-center">
                            <div>
                                <CircularIcon>{Icons.document(20, 20)}</CircularIcon>
                            </div>
                            <h4 className="text-primary">{currentPolicy?.title}</h4>
                        </div>
                        <DialogClose className="focus-visible:outline-none hover:bg-gray-100 p-2.5 rounded-full">
                            {Icons.dismiss(20, 20)}
                        </DialogClose>
                    </DialogHeader>
                    <HorizontalDivider></HorizontalDivider>
                    <div className="overflow-y-auto w-full p-6 max-h-[calc(100vh-14rem)]">
                        {/*<div>{currentPolicy?.category.category}</div>*/}
                        <div dangerouslySetInnerHTML={{__html: currentPolicy?.content || ''}}></div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PolicyViewDialog;
