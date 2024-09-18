import { IUseSales, SalesByPersonParams } from "../interfaces/IUseSales";
import { useApi } from "../hooks/use-api";
import {
  GETALLSALES_ENDPOINT,
  GETSALEBYID_ENDPOINT,
  CREATESALE_ENDPOINT,
  UPDATESALE_ENDPOINT,
  DELETESALE_ENDPOINT,
  GETSALESPRODUCTS_ENDPOINT,
  GETSALEPRODUCTS_ENDPOINT,
  ADDSALEPRODUCT_ENDPOINT,
  DELETESALEPRODUCT_ENDPOINT,
  GETSALESPERIODS_ENDPOINT,
  GET_RECENT_SALES_ENDPOINT,
} from "../api-config";

const validSalesLogSearch = (args: SalesByPersonParams) => {
  if (
    args.personId !== undefined &&
    args.month !== undefined &&
    args.year !== undefined
  )
    return true;
  return false;
};

const useSales = (): IUseSales => {
  const { get: GetAllSales } = useApi({
    endpoint: GETALLSALES_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validSalesLogSearch,
  });
  const { get: GetRecentSales } = useApi({
    endpoint: GET_RECENT_SALES_ENDPOINT,
  });
  const { get: GetSalesProducts } = useApi({
    endpoint: GETSALESPRODUCTS_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { get: GetSaleProducts } = useApi({
    endpoint: GETSALEPRODUCTS_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { get: GetSaleById } = useApi({
    endpoint: GETSALEBYID_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { post: CreateSale } = useApi({
    endpoint: CREATESALE_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: UpdateSale } = useApi({
    endpoint: UPDATESALE_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { post: AddSaleProduct } = useApi({
    endpoint: ADDSALEPRODUCT_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: DeleteSaleProduct } = useApi({
    endpoint: DELETESALEPRODUCT_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { get: GetSalesPeriods } = useApi({
    endpoint: GETSALESPERIODS_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: DeleteSale } = useApi({
    endpoint: DELETESALE_ENDPOINT,
    includeParamsInUrl: true,
  });

  return {
    GetAllSales,
    GetRecentSales,
    GetSaleById,
    CreateSale,
    GetSalesPeriods,
    UpdateSale,
    AddSaleProduct,
    DeleteSaleProduct,
    DeleteSale,
    GetSalesProducts,
    GetSaleProducts,
  };
};

export default useSales;
