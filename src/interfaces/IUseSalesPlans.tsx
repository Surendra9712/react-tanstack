import Employee from "@/types/Employee";
import LogicApp from "@/types/LogicApp";
import SalesPlan from "@/types/SalesPlan";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

export interface IUseSalesPlans {
  GetSalesPlans: () => UseQueryResult<SalesPlan[], Error>;
  GetParticipants: (args?: {
    salesPlanId: number;
  }) => UseQueryResult<Employee[], Error>;
  AddPlanParticipant: () => UseMutationResult<Boolean, Error, any, unknown>;
  GetElligableParticipants: () => UseQueryResult<Employee[], Error>;
  GetPlanTypes: () => UseQueryResult<LogicApp[], Error>;
  DeletePlanParticipant: () => UseMutationResult<Boolean, Error, any, unknown>;
  UpdateSalesPlan: () => UseMutationResult<Boolean, Error, any, unknown>;
  SaveParticipants: () => UseMutationResult<Boolean, Error, any, unknown>;
  CreateNewFrom: () => UseMutationResult<number, Error, any, unknown>;
}
