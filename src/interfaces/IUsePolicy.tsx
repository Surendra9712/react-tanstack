import Policy from "@/types/Policy";
import PolicyCategory from "@/types/PolicyCategory";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

export interface IUsePolicy {
  GetPolicies: (args?: {
    categoryId: number | undefined;
  }) => UseQueryResult<Policy[], Error>;
  GetCategories: () => UseQueryResult<PolicyCategory[], Error>;
  GetPolicyById: (args?: {
    policyId: number | undefined;
  }) => UseQueryResult<Policy, Error>;
  GetRecentPolicies: () => UseQueryResult<Policy[], Error>;
  CreatePolicy: () => UseMutationResult<number, Error, any, unknown>;
  UpdatePolicy: () => UseMutationResult<Boolean, Error, any, unknown>;
  DeletePolicy: () => UseMutationResult<Boolean, Error, any, unknown>;
}
