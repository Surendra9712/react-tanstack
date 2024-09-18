import Sale from "@/types/Sale";
import SalesProduct from "@/types/SalesProduct";
export interface ISalesProductDialog {
  isProductDialogOpen: boolean;
  clearProductDialog: () => void;
  sale: Sale | undefined;
  handleAddProduct: () => void;
  products: SalesProduct[];
}
