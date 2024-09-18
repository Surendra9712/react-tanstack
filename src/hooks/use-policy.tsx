import { IUsePolicy } from "../interfaces/IUsePolicy";
import { useApi } from "../hooks/use-api";
import {
  GETPOLICIES_ENDPOINT,
  GETCATEGORIES_ENDPOINT,
  GETPOLICYBYID_ENDPOINT,
  CREATEPOLICY_ENDPOINT,
  UPDATEPOLICY_ENDPOINT,
  DELETEPOLICY_ENDPOINT,
  GETRECENTPOLICIES_ENDPOINT,
} from "../api-config";

const usePolicy = (): IUsePolicy => {
  const { get: GetPolicies } = useApi({
    endpoint: GETPOLICIES_ENDPOINT,
    includeParamsInUrl: true,
    enabled: (args?: { categoryId: number }) =>
      args !== undefined && args.categoryId !== undefined,
  });
  const { get: GetCategories } = useApi({
    endpoint: GETCATEGORIES_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { get: GetPolicyById } = useApi({
    endpoint: GETPOLICYBYID_ENDPOINT,
    includeParamsInUrl: true,
    enabled: (args?: { policyId: number }) =>
      args !== undefined && args.policyId !== undefined,
  });
  const { get: GetRecentPolicies } = useApi({
    endpoint: GETRECENTPOLICIES_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: CreatePolicy } = useApi({
    endpoint: CREATEPOLICY_ENDPOINT,
    includeParamsInUrl: false,
  });
  const { post: UpdatePolicy } = useApi({
    endpoint: UPDATEPOLICY_ENDPOINT,
    includeParamsInUrl: true,
  });
  const { post: DeletePolicy } = useApi({
    endpoint: DELETEPOLICY_ENDPOINT,
    includeParamsInUrl: true,
  });

  return {
    GetPolicies,
    GetCategories,
    GetPolicyById,
    GetRecentPolicies,
    CreatePolicy,
    UpdatePolicy,
    DeletePolicy,
  };
};

export default usePolicy;
