import React, {useEffect, useState} from "react";
import usePolicy from "../../hooks/use-policy";
import {NavLink, useParams, useSearchParams} from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Policy from "@/types/Policy";
import QlContainer from "@/components/common/QlContainer";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import PolicyDialog from "@/components/Policy/PolicyDialog";
import AdminWrapper from "@/auth/components/AdminWrapper";
import setPageTitle from "@/hooks/setPageTitle";

const PolicyDetail: React.FC = () => {
    setPageTitle('Policy Details')
    const [policy, setPolicy] = useState<Policy | null>(null);
    const {categoryId, policyId} = useParams();
    const [isDialogOpen, setDialogMode] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        GetPolicies,
        GetPolicyById,
    } = usePolicy();
    const {
        data: policies,
        isLoading: policiesIsLoading,
        error: policiesError,
        refetch,
    } = GetPolicies(
        categoryId ? {categoryId: parseInt(categoryId)} : undefined
    );

    const {
        data: currentPolicy,
        isLoading: currentPolicyIsLoading,
        error: currentPolicyError,
        refetch: fetchCurrentPolicy
    } = GetPolicyById(policyId ? {policyId: parseInt(policyId)} : undefined);


    useEffect(() => {
        if (currentPolicy) {
            setPolicy(currentPolicy);
            setSearchParams({title: currentPolicy.title})
        }
    }, [currentPolicy]);
    if (policiesIsLoading) {
        return <div>Loading Policies...</div>;
    }
    if (policiesError || currentPolicyError) {
        return <div>Error Loading Policies</div>;
    }

    const relatedPolicies = policies?.filter(item => item.id !== currentPolicy?.id);

    return (
        <div className="flex justify-between gap-4 lg:gap-6 min-h-full bg-surface-base">
            <Card className="flex-1 max-md:border">
                {!policy ? <div className="p-2">Loading...</div> :
                    <>
                        <CardHeader className="flex sm:flex-row justify-between gap-3">
                            <CardTitle>{
                                policy?.title
                            }</CardTitle>
                            <AdminWrapper>
                                <Button
                                    className="w-fit"
                                    disabled={currentPolicyIsLoading}
                                    variant={'translucent'}
                                    onClick={() => setDialogMode(true)}
                                >
                                    {Icons.pen(20, 20)}
                                    <span>Edit</span>
                                </Button>
                            </AdminWrapper>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <QlContainer text={policy?.content || ''}/>
                        </CardContent>
                    </>
                }
            </Card>
            <Card className="hidden md:block w-48 lg:w-72 xl:w-[368px]">
                <CardHeader className="flex-row lg:px-6 px-4 justify-between items-center">
                    <CardTitle>Related Policies</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col lg:px-6 md:p-4 !pt-0'>
                    {relatedPolicies?.map((policy) => (
                        <NavLink key={policy.id} className="p-2 text-100 border-100 border-b truncate"
                                 to={`/policy/category/${categoryId}/${policy.id?.toString()}?title=${policy.title}`}>
                            <Label size="md" className="cursor-pointer">{policy.title}</Label>
                        </NavLink>
                    ))}
                </CardContent>
            </Card>
            <PolicyDialog
                isDialogOpen={isDialogOpen}
                clearDialog={() => setDialogMode(false)}
                handleDialogSubmit={() =>{
                    fetchCurrentPolicy().then()
                    setDialogMode(false)
                }}
                tempPolicy={policy}
                category={policy?.category}
            />
        </div>
    );
};

export default PolicyDetail;
