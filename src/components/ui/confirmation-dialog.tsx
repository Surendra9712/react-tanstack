import React from "react";
import {Button} from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogTitle,
} from "../ui/dialog";
import {CircularIcon} from "@/components/ui/icon";
import {Title} from "@/components/ui/title";
import {ContentBody} from "@/components/ui/contentBody";

export interface ConfirmDialogProps {
    open: boolean;
    title: string,
    subtitle: string,
    icon?: React.ReactNode,
    message?: string,
    close: () => void,
    confirm: () => void,
    buttonLabel?: string,
    buttonVariant?: "solid" | "translucent"|"subtle"
    color?: "primary" | "info"|"danger"|"accent"|"gray"|"warning"|"success"
}

const PolicyDialog: React.FC<ConfirmDialogProps> = ({
                                                        open,
                                                        title,
                                                        subtitle,
                                                        icon,
                                                        message,
                                                        buttonLabel = "Remove",
                                                        buttonVariant = "solid",
                                                        color = "danger",
                                                        close, confirm,
                                                    }) => {
    return (
        <>
            <Dialog open={open} onOpenChange={close}>
                <DialogContent className="gap-0 p-0">
                    <DialogHeader>
                        <div className="flex gap-4 items-center">
                            {icon && <div>
                                <CircularIcon>{icon}</CircularIcon>
                            </div>}
                            <DialogTitle>{title}</DialogTitle>
                        </div>
                    </DialogHeader>
                    <div className="p-4 sm:p-6 space-y-1">
                        <Title>{subtitle}</Title>
                        {message && <ContentBody size={'lg'}>{message}</ContentBody>}
                    </div>
                    <DialogFooter>
                        <Button variant={'outline'}
                                shade={'gray'} onClick={close}>
                            Cancel
                        </Button>
                        <Button type="submit" shade={color} variant={buttonVariant} onClick={confirm}>
                            {buttonLabel}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PolicyDialog;
