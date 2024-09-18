import React, {useEffect, useState} from "react";
import {Button} from "../ui/button";
import Policy from "@/types/Policy";
import usePolicy from "../../hooks/use-policy";
import {Link, useParams} from "react-router-dom";
import PolicyDialog from "./PolicyDialog";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Icons} from "@/components/icons";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {useToast} from "@/components/ui/use-toast";
import AdminWrapper from "@/auth/components/AdminWrapper";
import PolicySkeleton from "@/components/Policy/PolicySkeleton";
import setPageTitle from "@/hooks/setPageTitle";
import {ContentBody} from "@/components/ui/contentBody";

const ITEMS_PER_PAGE = 10;
const MAX_QUILL_CHARS = 100000;
const MAX_VISIBLE_PAGES = 5;

const PolicyComponent: React.FC = () => {
    setPageTitle("Policies");
    // Use the useParams hook to get the categoryId parameter from the route
    const {categoryId} = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    //dialog state
    const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view">(
        "create"
    );

    //current edit policy
    const [tempPolicy, setTempPolicy] = useState<Policy | null>(null);
    const [policyId, setPolicyId] = useState<number>();

    const {toast} = useToast();

    //form data and functions
    const {
        GetPolicies,
        GetPolicyById,
        DeletePolicy,
        GetCategories,
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
        data: categories,
        isLoading: categoriesIsLoading,
        error: categoriesError,
    } = GetCategories();
    const {
        data: currentPolicy,
        isLoading: currentPolicyIsLoading,
        error: currentPolicyError,
    } = GetPolicyById(tempPolicy ? {policyId: tempPolicy.id} : undefined);

    const {
        status: statusDelete,
        error: errorDelete,
        mutate: mutateDelete,
    } = DeletePolicy();

    //#region dialog functions
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const clearDialog = () => {
        setIsDialogOpen(false);
        setDialogMode("create"); // Set the modal back to "create" mode
        setTempPolicy(null)
    };

    //#region useEffects

    // Use useEffect to open the modal when currentPolicy is loaded or to view
    useEffect(() => {
        if (currentPolicy && !currentPolicyIsLoading) {
            setTempPolicy(currentPolicy);
            openDialog();
        }
    }, [currentPolicy, currentPolicyIsLoading]);
    //#endregion


    if (policiesError) {
        return <div>Error Loading Policies</div>;
    }

    if (categoriesError) {
        return <div>Error Loading Categories</div>;
    }
    if (!categoriesIsLoading && !categories) {
        return <div>No Categories</div>;
    }

    //#region event handlers
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSubmit = () => {
        refetch().then();
        clearDialog();
    };

    const handleDeleteMode = async (e: React.MouseEvent<HTMLButtonElement>, policyId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleteDialogOpen(true);
        setPolicyId(policyId)
    };

    const deletePolicy = async () => {
        setIsDeleteDialogOpen(false);
        mutateDelete(policyId, {
            onSuccess: () => {
                refetch(); //refresh policies listPolicy deleted successfully
                toast({message: "Policy deleted successfully."});
            },
            onError: (errorCreate: any) => {
                toast({message: "Error deleting policy. Please try again.", toastType: 'error'});
            },
        });
    }

    const handleUpdateOpen = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        // Set the dialog to "edit" mode and fetch the policy by ID
        setDialogMode("edit");
        setTempPolicy({
            id: id,
            title: "",
            category: {id: parseInt(categoryId!), category: ""},
            content: "",
            contentLocation: "",
        }); //set to empty policy of same id to trigger fetch
    };

    //#region pagination
    const renderPageButtons = () => {
        const pageButtons = [];

        // Calculate the start and end indices for the visible page buttons
        let startPage = Math.max(
            1,
            currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
        );
        let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

        // If the startPage is less than 1, adjust the endPage accordingly
        if (startPage <= 1) {
            endPage = Math.min(totalPages, MAX_VISIBLE_PAGES);
        }

        // If the endPage is greater than totalPages, adjust the startPage accordingly
        if (endPage >= totalPages) {
            startPage = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
        }

        // Add "Previous" button if there are more pages before the visible range
        if (startPage > 1) {
            pageButtons.push(
                <Button
                    size={"icon"}
                    key="previous"
                    variant={currentPage === 1 ? 'solid' : 'translucent'}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`mx-1 rounded-full h-8 w-8`}
                >
                    {Icons.chevronLeft()}
                </Button>
            );
        }

        // Add page buttons
        for (let page = startPage; page <= endPage; page++) {
            pageButtons.push(
                <Button
                    size={"sm"}
                    variant={currentPage === page ? 'solid' : 'translucent'}
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 h-8 w-8 rounded-full`}
                >
                    {page}
                </Button>
            );
        }

        // Add "Next" button if there are more pages beyond the visible range
        if (endPage < totalPages) {
            pageButtons.push(
                <Button
                    size={"icon"}
                    key="next"
                    variant={currentPage === totalPages ? 'solid' : 'translucent'}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`mx-1 rounded-full h-8 w-8`}
                >
                    {Icons.chevronRight()}
                </Button>
            );
        }

        return pageButtons;
    };

    const totalPages = policies ? Math.ceil(policies.length / ITEMS_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPolicies = policies ? policies.slice(startIndex, endIndex) : [];
    //#endregion

    return (
        <Card className="min-h-full max-md:border">
            <CardHeader className="sm:flex-row sm:justify-between sm:items-center gap-3">
                <CardTitle>{
                    categories && categories!.find((e: any) => e.id.toString() === categoryId)
                        ?.category
                }</CardTitle>

                <AdminWrapper>
                    <Button
                        className="w-fit"
                        onClick={() => {
                            setDialogMode("create");
                            openDialog();
                        }}
                    >
                        {Icons.plus(20, 20)}
                        Add New
                    </Button>
                </AdminWrapper>
            </CardHeader>
            <CardContent className="pt-0">
                {policiesIsLoading ? <PolicySkeleton/> :
                    <>
                        {policies && policies.map((policy) => (
                            <Link to={`${policy.id?.toString()}?title=${policy.title}`}
                                  className="flex justify-between items-center gap-4 cursor-pointer sm:p-4 py-4 border-b last:border-b-0"
                                  key={policy.id}>
                                <ContentBody
                                    size={'lg'}
                                    className="line-clamp-1 !text-100">{policy.title}</ContentBody>
                                <AdminWrapper>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={'translucent'}
                                            size="icon"
                                            className="w-8 h-8"
                                            onClick={(e) => handleUpdateOpen(e, policy.id!)}
                                        >
                                            {Icons.pen()}
                                        </Button>
                                        <Button
                                            size={'icon'}
                                            variant={'translucent'}
                                            shade={'danger'}
                                            className="w-8 h-8"
                                            onClick={(e) => handleDeleteMode(e, tempPolicy?.id!)}
                                        >
                                            {Icons.trash()}
                                        </Button>
                                    </div>
                                </AdminWrapper>
                            </Link>
                        ))}</>}

            </CardContent>
            {/*{totalPages > 1 && (*/}
            {/*    <div className="flex justify-center py-4 pt-0">{renderPageButtons()}</div>*/}
            {/*)}*/}

            <PolicyDialog
                category={categories && categories!.find((e: any) => e.id.toString() === categoryId)}
                isDialogOpen={isDialogOpen}
                clearDialog={clearDialog}
                handleDialogSubmit={handleSubmit}
                tempPolicy={tempPolicy}
                categories={categories!}
                handleQuillChange={() => {
                }}
            />
            <ConfirmationDialog
                icon={Icons.trash(20, 20)}
                open={isDeleteDialogOpen}
                title={'Remove Policy'}
                subtitle={"Are you sure you want to remove this policy?"}
                message={"Once a policy is removed, the action cannot be undone."}
                close={() => setIsDeleteDialogOpen(false)}
                confirm={deletePolicy}
            >
            </ConfirmationDialog>
        </Card>
    );
};

export default PolicyComponent;
