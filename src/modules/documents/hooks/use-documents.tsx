import { useApi } from "@/hooks/use-api";
import { GET_RECENT_DOCUMENTS_ENDPOINT } from "@/api-config";
import { IUseDocuments } from "../interfaces/use-documents-interface";

function useDocuments(): IUseDocuments {
  const { get: GetRecentDocuments } = useApi({
    endpoint: GET_RECENT_DOCUMENTS_ENDPOINT,
    includeParamsInUrl: false,
  });
  return { GetRecentDocuments };
}

export default useDocuments;
