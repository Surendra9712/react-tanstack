import React, {useEffect, useRef, useState} from "react";
import SalesLogTable from "./SalesLogTable";
import useSales from "@/hooks/use-sales";
import Sale from "@/types/Sale";
import SalesViewDialog from "./SalesViewDialog";
import SalesProductDialog from "./SalesProductDialog";
import SalesProduct from "@/types/SalesProduct";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import SalesPeriod from "@/types/SalesPeriod";
import useAuth from "@/hooks/use-auth";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Icons} from "@/components/icons";
import {toast} from "@/components/ui/use-toast";
import setPageTitle from "@/hooks/setPageTitle";

const SalesLogComponent: React.FC = () => {
    setPageTitle("Sales Log");
    const {User} = useAuth();
    const myUserId = User?.PersonId;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    //current edit sale
    const [tempSale, setTempSale] = useState<Sale | undefined>();
    //month state
    const [selectedMonth, setSelectedMonth] = useState<SalesPeriod | undefined>(
        undefined
    );
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<
        number | undefined
    >(myUserId);
    //dialog state
    const [dialogMode, setDialogMode] = useState<
        "default" | "edit" | "view" | "product"
    >("default");
    // Form values
    const stockNumberRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLInputElement>(null);
    const makeRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const saleAmountRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const vinRef = useRef<HTMLInputElement>(null);
    const leaseAmountRef = useRef<HTMLInputElement>(null);
    const tradeAmountRef = useRef<HTMLInputElement>(null);
    const customerNameRef = useRef<HTMLInputElement>(null);
    // Display values
    const [viewStockNumber, setViewStockNumber] = useState<number>(0);
    const [viewType, setViewType] = useState<string>("");
    const [viewModel, setViewModel] = useState<string>("");
    const [viewMake, setViewMake] = useState<string>("");
    const [viewYear, setViewYear] = useState<number>(0);
    const [viewCost, setViewCost] = useState<number>(0);
    const [viewSaleAmount, setViewSaleAmount] = useState<number>(0);
    const [viewColor, setViewColor] = useState<string>("");
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const [viewVin, setViewVin] = useState<number>(0);
    const [viewLeaseAmount, setViewLeaseAmount] = useState<number>(0);
    const [viewTradeAmount, setViewTradeAmount] = useState<number>(0);
    const [viewCustomerName, setViewCustomerName] = useState<string>("");
    //form data and functions
    const {
        GetAllSales,
        GetSaleById,
        CreateSale,
        UpdateSale,
        DeleteSale,
        GetSalesProducts,
        GetSaleProducts,
        GetSalesPeriods,
        DeleteSaleProduct,
    } = useSales();
    const {
        data: salesPeriods,
        isLoading: salesPeriodsIsLoading,
        error: salesPeriodsError,
    } = GetSalesPeriods();
    const {
        data: sales,
        isLoading: salesIsLoading,
        error: salesError,
        refetch,
    } = GetAllSales({
        month: selectedMonth?.month,
        year: selectedMonth?.year,
        personId: selectedEmployeeId,
    });
    const {
        data: salesProducts,
        isLoading: salesProductsIsLoading,
        error: salesProductsError,
    } = GetSalesProducts();
    const {
        data: saleProducts,
        isLoading: saleProductsIsLoading,
        error: saleProductsError,
        refetch: refetchProducts,
    } = GetSaleProducts(tempSale?.id ? {salesId: tempSale.id} : undefined);
    const {
        data: currentSale,
        isLoading: currentSaleIsLoading,
        error: currentSaleError,
    } = GetSaleById(tempSale?.id ? {salesId: tempSale.id} : undefined);
    const {
        status: statusCreate,
        error: errorCreate,
        mutate: mutateCreate,
    } = CreateSale();
    const {
        status: statusUpdate,
        error: errorUpdate,
        mutate: mutateUpdate,
    } = UpdateSale();

    const {
        status: statusDeleteSaleProduct,
        error: errorDeleteSaleProduct,
        mutate: mutateDeleteSaleProduct,
    } = DeleteSaleProduct();
    const {
        status: statusDelete,
        error: errorDelete,
        mutate: mutateDelete,
    } = DeleteSale();

    //#region dialog functions
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const openViewDialog = () => {
        setIsViewDialogOpen(true);
    };

    const clearViewDialog = () => {
        clearViewProps();
        setTempSale(undefined); // Clear the temp sale
        setIsViewDialogOpen(false);
    };

    const clearProductDialog = () => {
        setIsProductDialogOpen(false);
    };

    const clearViewProps = () => {
        setViewStockNumber(0);
        setViewType("");
        setViewMake("");
        setViewModel("");
        setViewYear(0);
        setViewSaleAmount(0);
        setViewVin(0);
        setViewDate(new Date());
        setViewColor("");
        setViewCost(0);
        setViewLeaseAmount(0);
        setViewTradeAmount(0);
        setViewCustomerName("");
    };

    const clearDialog = () => {
        clearViewProps();
        setIsDialogOpen(false);
        setDialogMode("default"); // Set the modal back to "default" mode
        // Reset inputs after successful mutation
        if (stockNumberRef.current) stockNumberRef.current.value = "";
        if (typeRef.current) typeRef.current.value = "";
        if (makeRef.current) makeRef.current.value = "";
        if (modelRef.current) modelRef.current.value = "";
        if (yearRef.current) yearRef.current.value = "";
        if (costRef.current) costRef.current.value = "";
        if (saleAmountRef.current) saleAmountRef.current.value = "";
        if (colorRef.current) colorRef.current.value = "";
        if (dateRef.current) dateRef.current.value = "";
        if (vinRef.current) vinRef.current.value = "";
        if (leaseAmountRef.current) leaseAmountRef.current.value = "";
        if (tradeAmountRef.current) tradeAmountRef.current.value = "";
        if (customerNameRef.current) customerNameRef.current.value = "";
    };
    //#endregion

    //#region useEffects
    // Use useEffect to wait until the modal is open before accessing refs for editing
    useEffect(() => {
        if (
            stockNumberRef.current &&
            typeRef.current &&
            modelRef.current &&
            makeRef.current &&
            yearRef.current &&
            costRef.current &&
            saleAmountRef.current &&
            colorRef.current &&
            dateRef.current &&
            vinRef.current &&
            leaseAmountRef.current &&
            tradeAmountRef.current &&
            customerNameRef.current &&
            dialogMode === "edit"
        ) {
            setTempSale(currentSale);
            if (tempSale) {
                stockNumberRef.current.value = tempSale?.stockNumber.toString();
                typeRef.current.value = tempSale.type;
                modelRef.current.value = tempSale.model;
                makeRef.current.value = tempSale.make;
                yearRef.current.value = tempSale.year.toString();
                costRef.current.value = tempSale.cost.toString();
                saleAmountRef.current.value = tempSale.saleAmount.toString();
                colorRef.current.value = tempSale.color;
                // Convert date to string before assigning to input
                dateRef.current.value = tempSale.date.toISOString().split("T")[0];
                vinRef.current.value = tempSale.vin.toString();
                leaseAmountRef.current.value = tempSale.leaseAmount.toString();
                tradeAmountRef.current.value = tempSale.tradeAmount.toString();
                customerNameRef.current.value = tempSale.customerName;
            }
        }
    }, [isDialogOpen]); // This effect will run when isDialogOpen changes

    // Use useEffect to open the modal when currentPolicy is loaded or to view
    useEffect(() => {
        if (currentSale && !currentSaleIsLoading) {
            setTempSale(currentSale);
            if (dialogMode === "view") {
                handleViewSale();
            } else {
                openDialog();
            }
        }
    }, [currentSale, currentSaleIsLoading]);
    //#endregion

    if (salesError) {
        return <div>Error Loading Sales</div>;
    }
    // if (!sales) {
    //   return <div>No Sales</div>;
    // }

    //#region event handlers
    const handleViewSale = async () => {
        setViewStockNumber(currentSale?.stockNumber!);
        setViewType(currentSale?.type!);
        setViewModel(currentSale?.model!);
        setViewMake(currentSale?.make!);
        setViewYear(currentSale?.year!);
        setViewCost(currentSale?.cost!);
        setViewSaleAmount(currentSale?.saleAmount!);
        setViewColor(currentSale?.color!);
        setViewDate(currentSale?.date!);
        setViewVin(currentSale?.vin!);
        setViewLeaseAmount(currentSale?.leaseAmount!);
        setViewTradeAmount(currentSale?.tradeAmount!);
        setViewCustomerName(currentSale?.customerName!);
        openViewDialog();
    };

    const handleDeleteProduct = async (salesId: number) => {
        await mutateDeleteSaleProduct(salesId, {
            onSuccess: () => {
                refetch(); //refresh policies list
                alert("Policy deleted successfully"); // Show success alert
            },
            onError: (errorCreate: any) => {
                console.error("Error deleting policy:", errorCreate);
                alert("Error deleting policy. Please try again.");
            },
        });
    };

    const handleUpdateSale = async (saleId: number | undefined) => {
        if (!saleId) {
            alert("Sale ID is required");
            return;
        }
        await mutateUpdate(
            {
                id: saleId,
                stockNumber: parseInt(stockNumberRef.current?.value!),
                type: typeRef.current?.value,
                make: makeRef.current?.value,
                model: modelRef.current?.value,
                color: colorRef.current?.value,
                year: parseInt(yearRef.current?.value!),
                cost: parseInt(costRef.current?.value!),
                saleAmount: parseInt(saleAmountRef.current?.value!),
                date: new Date(dateRef.current?.value!),
                vin: parseInt(vinRef.current?.value!),
                leaseAmount: parseInt(leaseAmountRef.current?.value!),
                tradeAmount: parseInt(tradeAmountRef.current?.value!),
                customerName: customerNameRef.current?.value,
            } as Sale,
            {
                onSuccess: () => {
                    refetch(); //refresh sales list
                    alert("Sale updated successfully"); // Show success alert
                },
                onError: (errorUpdate) => {
                    console.error("Error updating sale:", errorUpdate);
                    alert("Error updating sale. Please try again.");
                },
            }
        );

        clearDialog();
        clearViewDialog();
    };

    const handleViewOpen = async (saleId: number) => {
        // Set the modal to "view" mode and fetch the sale by ID
        setDialogMode("view");
        setTempSale({
            id: saleId,
            stockNumber: 0,
            type: "",
            model: "",
            make: "",
            year: 0,
            cost: 0,
            saleAmount: 0,
            color: "",
            date: new Date(),
            dateStr: "",
            vin: 0,
            leaseAmount: 0,
            tradeAmount: 0,
            customerName: "",
            finance: "",
        }); //set to empty sale of same id to trigger fetch
    };

    const handleUpdateOpen = async () => {
        // Set the dialog to "edit" mode and fetch the policy by ID
        setDialogMode("edit");
        openDialog();
    };

    const handleDialogSubmit = () => {
        handleUpdateSale(tempSale?.id);
    };

    const addProductClick = () => {
        setDialogMode("product");
        setIsProductDialogOpen(true);
    };

    const handleDeleteProductClick = async (product: SalesProduct) => {
        mutateDeleteSaleProduct(product, {
            onSuccess: () => {
                refetchProducts();
                toast({message: "Product deleted successfully"}); // Show success alert
            },
            onError: (errorDeleteSaleProduct) => {
                toast({message: "Error deleting product. Please try again.", toastType: 'error'});
            },
        });
    };

    const handleMonthChange = (salesPeriod: string) => {
        setSelectedMonth(salesPeriods?.find((f) => f.period == salesPeriod)); // Assuming newValue is the correct format
        //refetch(); // This should be called to refetch the sales based on the new selectedMonth
    };

    //#endregion

    return (
        <Card className="min-h-full max-md:border">
            <CardHeader className="grid grid-cols-[90px,minmax(0,1fr)] justify-between items-center">
                <CardTitle>Sales Log</CardTitle>
                <div>
                    <div id="monthsDdl" className="max-w-56 ml-auto">
                        <Select
                            value={selectedMonth?.period}
                            onValueChange={handleMonthChange}
                            defaultValue={selectedMonth?.period}
                        >
                            <div className="flex items-center relative">
                                <span className="absolute left-3">{Icons.calendar()}</span>
                                <SelectTrigger className="focus:ring-0 focus:border-gray-200 pl-8">
                                    <SelectValue placeholder="Choose period"/>
                                </SelectTrigger>
                            </div>
                            <SelectContent>
                                {salesPeriods &&
                                    salesPeriods!.map((salesPeriod) => (
                                        <SelectItem
                                            key={salesPeriod.id}
                                            value={salesPeriod.period}
                                            onSelect={() => handleMonthChange(salesPeriod.period)}
                                        >
                                            {salesPeriod.period}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="py-0">
                <SalesLogTable isLoading={salesIsLoading} salesLogs={sales!} onSaleClick={handleViewOpen}/>

                <SalesViewDialog
                    isViewDialogOpen={isViewDialogOpen}
                    clearViewDialog={clearViewDialog}
                    addProductClick={addProductClick}
                    products={saleProducts!}
                    viewSale={tempSale}
                    handleUpdateOpen={handleUpdateOpen}
                    handleDeleteProductClick={handleDeleteProductClick}
                />

                <SalesProductDialog
                    isProductDialogOpen={isProductDialogOpen}
                    clearProductDialog={clearProductDialog}
                    sale={tempSale}
                    handleAddProduct={() => {
                        refetchProducts().then();
                        clearProductDialog()
                    }}
                    products={salesProducts!}
                />

                {/* <SalesDialog
                isDialogOpen={isDialogOpen}
                clearDialog={clearDialog}
                clearViewDialog={clearViewDialog}
                handleDialogSubmit={handleDialogSubmit}
                tempSale={tempSale}
                stockNumberRef={stockNumberRef}
                typeRef={typeRef}
                modelRef={modelRef}
                makeRef={makeRef}
                yearRef={yearRef}
                costRef={costRef}
                saleAmountRef={saleAmountRef}
                colorRef={colorRef}
                dateRef={dateRef}
                vinRef={vinRef}
                leaseAmountRef={leaseAmountRef}
                tradeAmountRef={tradeAmountRef}
                customerNameRef={customerNameRef}
                stockNumberError={stockNumberError}
                setStockNumberError={setStockNumberError}
                typeError={typeError}
                setTypeError={setTypeError}
                modelError={modelError}
                setModelError={setModelError}
                makeError={makeError}
                setMakeError={setMakeError}
                yearError={yearError}
                setYearError={setYearError}
                costError={costError}
                setCostError={setCostError}
                saleAmountError={saleAmountError}
                setSaleAmountError={setSaleAmountError}
                colorError={colorError}
                setColorError={setColorError}
                dateError={dateError}
                setDateError={setDateError}
                vinError={vinError}
                setVinError={setVinError}
                leaseAmountError={leaseAmountError}
                setLeaseAmountError={setLeaseAmountError}
                tradeAmountError={tradeAmountError}
                setTradeAmountError={setTradeAmountError}
                customerNameError={customerNameError}
                setCustomerNameError={setCustomerNameError}
            /> */}
            </CardContent>
            {(sales && sales.length > 0) && <CardFooter className="gap-2 py-2">
                <span className="text-body-lg">Total:</span>
                <span
                    className="text-title-md font-semibold text-primary">${sales.reduce((total, sale) => total + sale.saleAmount, 0).toFixed(2)}</span>
            </CardFooter>}

        </Card>
    );
};

export default SalesLogComponent;
