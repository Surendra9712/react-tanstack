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
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {Label} from "@/components/ui/label";
import {Skeleton} from "@/components/ui/skeleton";

function ProfileTabSkeleton() {
    return (
        <Card className="border-0">
            <div className="h-[calc(100vh-389px)] overflow-y-auto">
                <CardHeader className='py-0 px-6'>
                    <CardTitle>Employee's Profile</CardTitle>
                    <CardDescription>
                        Make changes to this employee here. Click save when you're done.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                    <div className="relative space-y-1">
                        <Skeleton className="animate-pulse w-24 h-4"></Skeleton>
                        <Input
                            disabled
                            className="bg-gray-100 animate-pulse"
                            type="text"
                        />
                    </div>
                    <div className="relative space-y-1">
                        <Skeleton className="animate-pulse w-24 h-4"></Skeleton>
                        <Input
                            disabled
                            className="bg-gray-100 animate-pulse"
                            type="text"
                        />
                    </div>
                    <div id="departmentDdl" className="space-y-1 relative">

                        <Skeleton className="animate-pulse w-24 h-4"></Skeleton>
                        <Select
                            disabled
                        >
                            <SelectTrigger
                                className="bg-gray-100 animate-pulse">
                                <SelectValue/>
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div className="space-y-1 relative">
                        <Skeleton className="animate-pulse w-24 h-4"></Skeleton>
                        <Select disabled>
                            <SelectTrigger
                                className="bg-gray-100 animate-pulse">
                                <SelectValue/>
                            </SelectTrigger>
                        </Select>
                    </div>
                </CardContent>
            </div>
            <CardFooter className='p-6 border-t justify-end border-gray-100'>
                <Skeleton className="bg-gray-100 animate-pulse h-10 w-16"
                />
            </CardFooter>
        </Card>
    );
}

export default ProfileTabSkeleton;
