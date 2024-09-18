import Sale from "@/types/Sale";
import SalesProduct from "@/types/SalesProduct";

export interface ISalesViewDialog {
  isViewDialogOpen: boolean;
  clearViewDialog: () => void;
  addProductClick: () => void;
  products: SalesProduct[];
  viewSale: Sale | undefined;
  handleUpdateOpen: () => Promise<void>;
  handleDeleteProductClick: (product: SalesProduct) => Promise<void>;
}
