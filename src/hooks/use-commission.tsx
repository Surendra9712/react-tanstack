import {
  CommissionByPersonParams,
  CommissionByPlanParams,
  CommissionParam,
  IUseCommission,
} from "../interfaces/IUseCommission";
import { useApi } from "./use-api";
import {
  GETCOMMISSIONS_ENDPOINT,
  GET_RECENT_COMMISSIONS_ENDPOINT,
  GETCOMMISSIONPERIODS_ENDPOINT,
  GETCOMMISSIONBYID_ENDPOINT,
  CREATECOMMISSION_ENDPOINT,
  UPDATECOMMISSION_ENDPOINT,
  DELETECOMMISSION_ENDPOINT,
  GETCOMMISSIONINFO_ENDPOINT,
  CALC_COMMISSION_BY_PLAN_ENDPOINT,
  CALC_COMMISSION_BY_PERSON_ENDPOINT,
} from "../api-config";

const validCommissionSearch = (args: CommissionByPersonParams) => {
  if (
    args.personId !== undefined &&
    args.month !== undefined &&
    args.year !== undefined
  )
    return true;
  return false;
};

const validCommissionByPlanSearch = (args: CommissionByPlanParams) => {
  if (
    args.salesPlanId !== undefined &&
    args.month !== undefined &&
    args.year !== undefined
  )
    return true;
  return false;
};

const validCommissionId = (args: CommissionParam) => {
  if (args.commissionId) return true;
  return false;
};

const useCommission = (): IUseCommission => {
  const { get: GetCommissions } = useApi({
    endpoint: GETCOMMISSIONS_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validCommissionSearch,
  });
  const { get: GetRecentCommissions } = useApi({
    endpoint: GET_RECENT_COMMISSIONS_ENDPOINT,
  });
  const { get: GetCommissionInfo } = useApi({
    endpoint: GETCOMMISSIONINFO_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validCommissionSearch,
    cacheTime: 5000,
    staleTime: 5000,
  });
  const { get: GetCommissionPeriods } = useApi({
    endpoint: GETCOMMISSIONPERIODS_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { get: GetCommissionById } = useApi({
    endpoint: GETCOMMISSIONBYID_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validCommissionId,
  });
  const { post: CreateCommission } = useApi({
    endpoint: CREATECOMMISSION_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: UpdateCommission } = useApi({
    endpoint: UPDATECOMMISSION_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validCommissionId,
  });
  const { post: DeleteCommission } = useApi({
    endpoint: DELETECOMMISSION_ENDPOINT,
    includeParamsInUrl: true,
    enabled: validCommissionId,
  });
  const { get: CalcCommissionByPlan } = useApi({
    endpoint: CALC_COMMISSION_BY_PLAN_ENDPOINT,
    includeParamsInUrl: false,
    enabled: validCommissionByPlanSearch,
    staleTime: 0,
    cacheTime: 0,
  });
  const { get: CalcCommissionByPersonId } = useApi({
    endpoint: CALC_COMMISSION_BY_PERSON_ENDPOINT,
    includeParamsInUrl: false,
    enabled: validCommissionSearch,
    staleTime: 0,
    cacheTime: 0,
  });

  return {
    GetCommissions,
    GetRecentCommissions,
    GetCommissionInfo,
    GetCommissionPeriods,
    GetCommissionById,
    CreateCommission,
    UpdateCommission,
    DeleteCommission,
    CalcCommissionByPlan,
    CalculateCommissionByPersonId: CalcCommissionByPersonId,
  };
};

export default useCommission;
