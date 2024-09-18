import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import usePolicy from "@/hooks/use-policy";
import React from "react";
import Policy from "@/types/Policy";
import {useNavigate} from "react-router-dom";
import {ContentBody} from "@/components/ui/contentBody";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import RecentViewSkeleton from "@/modules/dashboard/components/recent-view-skeleton";

function RecentPolicies() {
    const {GetRecentPolicies, GetPolicyById} = usePolicy();
    const {data, isLoading} = GetRecentPolicies();

    /**
     * Dialog view*/
        // const [selectedPolicyId, setPolicyId] = useState<number | null>(null);
        // const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const navigate = useNavigate();
    // const {
    //     data: currentPolicy,
    //     isLoading: currentPolicyIsLoading,
    //     error: currentPolicyError,
    // } = GetPolicyById(selectedPolicyId ? {policyId: selectedPolicyId} : undefined);

    const handleViewOpen = async (policy: Policy) => {
        navigate(`/policy/category/${policy.category.id}/${policy.id?.toString()}?title=${policy.title}`)
    };
    /**
     Dialog view
     * */
    // useEffect(() => {
    //     if (currentPolicy && !currentPolicyIsLoading) {
    //         setIsViewDialogOpen(true)
    //     }
    // }, [currentPolicy, currentPolicyIsLoading]);

    return (
        <>
            <CardHeader>
                <CardTitle>Recently Added Policies</CardTitle>
                <CardDescription>
                    A list of the most recently added policies.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                {isLoading && <RecentViewSkeleton/>}
                {!isLoading &&
                    data &&
                    data.slice(0, 5).map((policy) => (
                        <div
                            className="flex items-center justify-between gap-4 py-2 sm:py-4 sm:px-2 border-b last:border-b-0"
                            key={policy.id}>
                            <div>
                                <ContentBody
                                    size={'lg'}
                                    className="line-clamp-1 break-all !text-100">{policy.title}</ContentBody>
                                <p className="text-body-sm text-300">Recently Added</p>
                            </div>
                            <div>
                                <Button onClick={() => handleViewOpen(policy)} variant="subtle" size={'icon'}
                                        className="text-primary h-8 w-8">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                    ))}
            </CardContent>

            {/**
             Dialog view
             */}
            {/*<PolicyViewDialog*/}
            {/*    currentPolicy={currentPolicy}*/}
            {/*    clearViewDialog={()=>setIsViewDialogOpen(false)}*/}
            {/*    isViewDialogOpen={isViewDialogOpen}*/}
            {/*/>*/}
        </>
    );
}

export default RecentPolicies;
