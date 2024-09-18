import { SalesChart } from "@/components/SalesLog/interfaces/SalesChart";
import Sale from "@/types/Sale";
import SalesPeriod from "@/types/SalesPeriod";
import SalesProduct from "@/types/SalesProduct";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

export interface SalesByPersonParams {
  month: number | undefined;
  year: number | undefined;
  personId: number | undefined;
}

export interface ISalesSearchParams {
  salesId: number | undefined;
}

export interface IUseSales {
  GetAllSales: (args: SalesByPersonParams) => UseQueryResult<Sale[], Error>;
  GetRecentSales: () => UseQueryResult<SalesChart[], Error>;
  GetSalesProducts: () => UseQueryResult<SalesProduct[], Error>;
  GetSaleProducts: (
    args?: ISalesSearchParams
  ) => UseQueryResult<SalesProduct[], Error>;
  GetSaleById: (args?: ISalesSearchParams) => UseQueryResult<Sale, Error>;
  GetSalesPeriods: () => UseQueryResult<SalesPeriod[], Error>;
  CreateSale: () => UseMutationResult<number, Error, any, unknown>;
  UpdateSale: () => UseMutationResult<Boolean, Error, any, unknown>;
  AddSaleProduct: () => UseMutationResult<Boolean, Error, any, unknown>;
  DeleteSaleProduct: () => UseMutationResult<Boolean, Error, any, unknown>;
  DeleteSale: () => UseMutationResult<Boolean, Error, any, unknown>;
}
