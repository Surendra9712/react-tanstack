import { CommissionChart } from "@/components/Commission/interfaces/CommissionChart";
import Commission from "@/types/Commission";
import CommissionInfo from "@/types/CommissionInfo";
import CommissionPeriod from "@/types/CommissionPeriod";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

export interface CommissionByPersonParams {
  month: number | undefined;
  year: number | undefined;
  personId: number | undefined;
}

export type CommissionByPlanParams = {
  month: number | undefined;
  year: number | undefined;
  salesPlanId: number | undefined;
};

export interface CommissionParam {
  commissionId: number | undefined;
}

export interface IUseCommission {
  GetCommissions: (
    args: CommissionByPersonParams
  ) => UseQueryResult<Commission[], Error>;
  GetRecentCommissions: () => UseQueryResult<CommissionChart[], Error>;
  GetCommissionInfo: (
    args: CommissionByPersonParams
  ) => UseQueryResult<CommissionInfo[], Error>;
  GetCommissionPeriods: () => UseQueryResult<CommissionPeriod[], Error>;
  GetCommissionById: (
    args: CommissionParam
  ) => UseQueryResult<Commission, Error>;
  CreateCommission: () => UseMutationResult<number, Error, any, unknown>;
  UpdateCommission: () => UseMutationResult<Boolean, Error, any, unknown>;
  DeleteCommission: () => UseMutationResult<Boolean, Error, any, unknown>;
  CalcCommissionByPlan: (
    args: CommissionByPlanParams | undefined
  ) => UseQueryResult<Commission, Error>;
  CalculateCommissionByPersonId: (
    args: CommissionByPersonParams | undefined
  ) => UseQueryResult<Commission, Error>;
}
