import React from "react";
import {Button} from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader, DialogTitle,
} from "../ui/dialog";
import {ISalesViewDialog} from "@/interfaces/ISalesViewDialog";
import {
    Card,
    CardContent,
    CardHeader,
} from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import SalesProduct from "@/types/SalesProduct";
import {ContentBody} from "@/components/ui/contentBody";
import {Title} from "@/components/ui/title";

const SalesViewDialog: React.FC<ISalesViewDialog> = ({
                                                         isViewDialogOpen,
                                                         clearViewDialog,
                                                         addProductClick,
                                                         products,
                                                         viewSale,
                                                         handleDeleteProductClick,
                                                     }) => {
    const [isConfirmationDialogOpen, setDialogOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<SalesProduct>();
    return (
        <>
            <Dialog open={isViewDialogOpen} onOpenChange={clearViewDialog}>
                <DialogContent className="max-w-[800px]">
                    <DialogHeader>
                        <div className="flex gap-4 items-center">
                            <div>
                                <CircularIcon>{Icons.arrowGrowth(20, 20)}</CircularIcon>
                            </div>
                            <DialogTitle>Sales Information</DialogTitle>
                        </div>
                    </DialogHeader>
                    <Card
                        className="border-0 space-y-6 md:p-6 p-4 max-h-[calc(100vh-200px)] overflow-y-auto tiny-scrollbar">
                        <CardHeader className="gap-4 md:px-0 p-0">
                            <div
                                className="justify-center items-center grid sm:grid-cols-4 grid-cols-2 gap-4">
                                <div className="text-center p-2 rounded border bg-surface-base">
                                    <Title
                                        size={'md'}>{viewSale?.make}</Title>
                                    <ContentBody size={'sm'}>Make</ContentBody>
                                </div>
                                <div className="text-center p-2 rounded border bg-surface-base">
                                    <Title
                                        size={'md'}>{viewSale?.model}</Title>
                                    <ContentBody size={'sm'}>Model</ContentBody>
                                </div>
                                <div className="text-center p-2 rounded border bg-surface-base">
                                    <Title
                                        size={'md'}>{viewSale?.year}</Title>
                                    <ContentBody size={'sm'}>Year</ContentBody>
                                </div>
                                <div className="text-center p-2 rounded border bg-surface-base">
                                    <Title
                                        size={'md'}>{viewSale?.vin}</Title>
                                    <ContentBody size={'sm'}>VIN</ContentBody>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 md:px-0 p-0">
                            <div className="flex gap-4 justify-between md:flex-row flex-col">
                                <div>
                                    <Title size={'md'}>Products</Title>
                                    <ContentBody>Please make any necessary adjustments or modifications to this sale
                                        here.</ContentBody>
                                </div>
                                <Button className="whitespace-nowrap w-fit" size={'sm'} onClick={addProductClick}>
                                    {Icons.plus()}
                                    Add New
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="!border-b-0">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Sale Amount</TableHead>
                                        <TableHead className="w-16">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products?.length ?
                                        products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.productCode}</TableCell>
                                                <TableCell>{product.cost}</TableCell>
                                                <TableCell>{product.saleAmount}</TableCell>
                                                <TableCell className="w-16">
                                                    <Button
                                                        size={"icon"}
                                                        variant={'translucent'}
                                                        shade="danger"
                                                        className="w-8 h-8"
                                                        onClick={() => {
                                                            setSelectedProduct(product);
                                                            setDialogOpen(true)
                                                        }
                                                        }>
                                                        {Icons.trash()}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )) : <TableRow>
                                            <TableCell colSpan={4} className="text-center py-4">Products not
                                                found</TableCell>
                                        </TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
            <ConfirmationDialog open={isConfirmationDialogOpen}
                                icon={Icons.trash(20, 20)}
                                title={"Remove Product"}
                                subtitle={"Are you sure you want to remove this product?"}
                                message={"Once you remove the product, the action cannot be undone."}
                                close={() => setDialogOpen(false)}
                                confirm={() => {
                                    selectedProduct && handleDeleteProductClick(selectedProduct);
                                    setDialogOpen(false)
                                }}/>
        </>
    );
};

export default SalesViewDialog;
