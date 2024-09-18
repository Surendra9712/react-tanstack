import {ICommissionMiniTable} from "@/interfaces/ICommissionMiniTable";
import {HorizontalDivider} from "@/components/ui/divider";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card";
import React from "react";

const CommissionMiniTable: React.FC<ICommissionMiniTable> = ({
                                                                 commissionInfo,
                                                             }) => {
    return (
        <Card className="bg-primary-translucent max-w-96 rounded p-4 space-y-4">
            <CardTitle className="text-title-md">Commission Calculated</CardTitle>
            <CardContent className="space-y-1 !p-0">
                {commissionInfo?.map((info) => (
                    <div className="flex justify-between" key={info.id}>
                        <span className="text-body-md text-200">{info.item}:</span>
                        <span className="text-title-sm font-semibold">${info.amount}</span>
                    </div>
                ))}
                <HorizontalDivider className="bg-primary !my-4"/>
            </CardContent>
            <CardFooter className="p-0 justify-between">
                <span className="text-body-md text-100">Total</span>
                <span className="text-body-md text-primary font-semibold">${commissionInfo
                    ?.reduce((total, info) => total + info.amount, 0)
                    .toFixed(2)}
                        </span>
            </CardFooter>
        </Card>
    );
};

export default CommissionMiniTable;
