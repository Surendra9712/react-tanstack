import { useApi } from "./use-api";
import {
  CREATE_DIRECTORY_ENDPOINT, DELETE_DIRECTORY_ENDPOINT, GET_DIRECTORY_ENDPOINT,
} from "@/api-config";
import {IDirectory} from "@/interfaces/IDirectory";

const useDocuments = (): IDirectory => {
  const { get: GetDirectory } = useApi({
    endpoint: GET_DIRECTORY_ENDPOINT,
  });
  const { post: CreateDirectory } = useApi({
    endpoint: CREATE_DIRECTORY_ENDPOINT,
  });
  const {post: DeleteDirectory } = useApi({
    endpoint: DELETE_DIRECTORY_ENDPOINT,
  });

  return {
    GetDirectory,
    CreateDirectory,
    DeleteDirectory
  };
};

export default useDocuments;
