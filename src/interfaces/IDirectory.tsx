import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import {UserDocument} from "@/modules/documents/components/document-manager";


export interface IDirectory {
  GetDirectory: () => UseQueryResult<UserDocument[], Error>;
  CreateDirectory: () => UseMutationResult<any, Error, any, unknown>;
  DeleteDirectory: () => UseMutationResult<any, Error, any, unknown>;
}
