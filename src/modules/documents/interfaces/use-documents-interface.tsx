import { UseQueryResult } from "@tanstack/react-query";
import { UserDocument } from "../components/document-manager";

export interface IUseDocuments {
  GetRecentDocuments: () => UseQueryResult<UserDocument[], Error>;
}
