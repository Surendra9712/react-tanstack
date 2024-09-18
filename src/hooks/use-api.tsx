import {
  useQuery,
  QueryKey,
  useMutation,
  MutationKey,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { IUseApi } from "../interfaces/IUseApi";
import useAxios from "./use-axios";
import { AxiosRequestConfig } from "axios";

export const defaultEnabledCheck = (args: any) =>
  args !== undefined && args !== null && args !== Number.NaN;

export function useApi({
  endpoint,
  includeParamsInUrl,
  enabled = true,
  staleTime = 1000 * 60 * 5, //5 minutes
  cacheTime = 1000 * 60 * 5, //5 minutes
  refetchInterval = false,
  refetchOnWindowFocus = true,
}: IUseApi) {
  const api = useAxios(true);

  const useQueryHelper = (args?: Record<string, any>) =>
    useQuery({
      queryKey: [endpoint, args] as QueryKey,
      queryFn: async (queryFnCtx: QueryFunctionContext) => {
        let url = endpoint;
        const config: AxiosRequestConfig = { params: args };
        const { data } = await api.get(url, config);

        return data;
      },
      enabled: typeof enabled === "function" ? enabled(args) : enabled,
      staleTime: staleTime,
      gcTime: cacheTime,
      retry: 3,
      refetchOnWindowFocus: refetchOnWindowFocus,
      refetchInterval: refetchInterval,
    });

  const useMutationHelper = (args?: any) =>
    useMutation({
      mutationKey: [endpoint] as MutationKey,
      mutationFn: async (postData: any) => {
        let url = endpoint;
        //conditionally use the param or the arg depending on the situation
        // if (includeParamsInUrl) {
        //   if (args) {
        //     url += `/${args}`;
        //   }
        // }
        const axiosReqConfig: AxiosRequestConfig = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
        const { data } = await api.post(url, postData, axiosReqConfig);
        return data;
      },
    });

  return {
    get: useQueryHelper,
    post: useMutationHelper,
  };
}
