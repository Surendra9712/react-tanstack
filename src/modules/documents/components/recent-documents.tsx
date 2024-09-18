import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useDocuments from "../hooks/use-documents";
import {useNavigate} from "react-router-dom";
import {ContentBody} from "@/components/ui/contentBody";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import React from "react";
import RecentViewSkeleton from "@/modules/dashboard/components/recent-view-skeleton";

function RecentDocuments() {
    const {GetRecentDocuments} = useDocuments();
    const {data, isLoading} = GetRecentDocuments();
    const nav = useNavigate();

    const recentDocuments = data ? data.slice(0, 4) : [];
    return (
        <Card className="flex flex-col gap-3 border">
            <CardHeader>
                <CardTitle>Recently Added Documents</CardTitle>
                <CardDescription>
                    A list of the most recently uploaded documents.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                {isLoading && <RecentViewSkeleton/>}
                {!isLoading &&
                    data &&
                    recentDocuments.map((document) => (
                        <div
                            className="flex items-center justify-between gap-4 py-2 sm:py-4 sm:px-2 border-b last:border-b-0"
                            key={document.id}>
                            <div>
                                <ContentBody
                                    size="lg"
                                    className="line-clamp-1 break-all !text-100">{document.name}</ContentBody>
                                <p className="text-body-sm text-300">
                                    Added {document.modifiedDateTimeStr}
                                </p>
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        nav("document-manager");
                                    }}
                                    variant="subtle" size={'icon'}
                                    className="text-primary h-8 w-8"
                                >
                                    <ArrowRightIcon className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                    ))}
            </CardContent>
        </Card>
    );
}

export default RecentDocuments;
