import React from "react";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogTitle,
} from "../ui/dialog";
import {Input} from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    Card,
    CardContent,
} from "../ui/card";
import {ISalesProductDialog} from "@/interfaces/ISalesProductDialog";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import FieldError from "@/components/ui/field-error";
import {useForm} from "@tanstack/react-form";
import {isNullOrUndefinedOrEmpty} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";
import useSales from "@/hooks/use-sales";

const SalesProductDialog: React.FC<ISalesProductDialog> = ({
                                                               isProductDialogOpen,
                                                               clearProductDialog,
                                                               sale,
                                                               handleAddProduct,
                                                               products,
                                                           }) => {

    // [selectedProduct, setSelectedProduct] = useState<SalesProduct|undefined>()
    const {
        AddSaleProduct,
    } = useSales();

    const {
        status: statusAddSaleProduct,
        error: errorAddSaleProduct,
        mutate: mutateAddSaleProduct,
    } = AddSaleProduct();

    const form = useForm({
        defaultValues: {
            salesId: sale?.id,
            name: !isNullOrUndefinedOrEmpty(products) ? products[0]?.name : '',
            cost: '',
            saleAmount: '',
            id: null,
        },
        onSubmit: async ({value}) => {
            handleAdd().then();
        }
    });

    const handleAdd = async () => {
        if (!sale) {
            toast({message: "Sale not found", toastType: 'error'});
            return;
        }

        const {name, cost, saleAmount} = form.state.values;

        const selectedProduct = products.find((f) => f.name == name);
        const formData =            {
                ...form.state.values,
                id: selectedProduct?.id,
                cost: parseFloat(cost),
                saleAmount: parseFloat(saleAmount)
            }
        ;

        mutateAddSaleProduct(
            formData,
            {
                onSuccess: () => {
                    handleAddProduct();
                    toast({message: "Product created successfully"}); // Show success alert
                },
                onError: (errorAddSaleProduct) => {
                    toast({message: "Error creating product. Please try again.", toastType: 'error'});
                },
            }
        );
    };

    return (
        <>
            <Dialog open={isProductDialogOpen} onOpenChange={clearProductDialog}>
                <DialogContent className="max-w-[500px]">
                    <DialogHeader>
                        <div className="flex gap-4 items-center">
                            <div>
                                <CircularIcon>{Icons.addCircle(20, 20)}</CircularIcon>
                            </div>
                            <DialogTitle>Add Product</DialogTitle>
                        </div>
                    </DialogHeader>
                    <Card>
                        <form onSubmit={(e) =>{
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit()
                        }}>
                            <CardContent className="space-y-4 mb-2">
                                <div className="w-full space-y-1">
                                    <form.Field
                                        name="name"
                                        defaultValue={!isNullOrUndefinedOrEmpty(products) ? products[0].name : ''}
                                        children={(field) => {
                                            return (
                                                <>
                                                    <Label weight="medium" htmlFor={field.name}>Select Product</Label>
                                                    <Select onValueChange={field.handleChange}
                                                            name={field.name}
                                                            value={field.state.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="-pick-"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {products &&
                                                                products!.map((product) => (
                                                                    <SelectItem
                                                                        key={product.id}
                                                                        value={product.name.toString()}
                                                                    >
                                                                        {product.name}
                                                                    </SelectItem>
                                                                ))}
                                                        </SelectContent>
                                                    </Select>
                                                </>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="relative space-y-1">
                                    <form.Field
                                        name="cost"
                                        defaultValue={''}
                                        validators={{
                                            onChange: ({value}) =>
                                                !value ? 'Cost amount is required'
                                                    : undefined,
                                        }}
                                        children={(field) => {
                                            return (
                                                <>
                                                    <Label weight="medium" htmlFor={field.name}>Cost Amount</Label>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        type="number"
                                                        data-error={field.getMeta().errors.length > 0}
                                                        placeholder="Enter cost amount"
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    <FieldError field={field}/>
                                                </>
                                            )
                                        }}
                                    />
                                </div>
                                <div className='relative space-y-1'>
                                    <form.Field
                                        name="saleAmount"
                                        defaultValue={''}
                                        validators={{
                                            onChange: ({value}) =>
                                                !value ? 'Sale amount is required'
                                                    : undefined,
                                        }}
                                        children={(field) => {
                                            return (
                                                <>
                                                    <Label weight="medium" htmlFor={field.name}>Sale Amount</Label>
                                                    <Input
                                                        id={field.name}
                                                        type="number"
                                                        data-error={field.getMeta().errors.length > 0}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        placeholder="Enter sale amount"
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    <FieldError field={field}/>
                                                </>
                                            )
                                        }}
                                    />
                                </div>
                            </CardContent>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type={'reset'} shade={'gray'} variant={'outline'}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type={'submit'} isLoading={statusAddSaleProduct ==='pending'}>
                                    Add
                                </Button>
                            </DialogFooter>
                        </form>
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SalesProductDialog;
