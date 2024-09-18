import FileBrowser from "@/components/common/file_browser/FileBrowser";
import {UUID} from "crypto";
import {useEffect, useState} from "react";
import useAxios from "@/hooks/use-axios";
import useAuth from "@/hooks/use-auth";
import useDocuments from "@/hooks/use-documents";
import setPageTitle from "@/hooks/setPageTitle";

export type UserDocument = {
  id?: UUID;
  name: string;
  display: string;
  location?: string;
  documentType?: UserDocumentType;
  documents?: UserDocument[];
  parent?: UserDocument;
  size?: number;
  contentType?: string;
  modifiedDateTime?: Date;
  modifiedDateTimeStr?: string;
};
export type UserDocumentData = {
  id?: UUID;
  name: string;
  isSelected: boolean;
  size: number;
  modified: string;
  documentType: UserDocumentType;
};

export enum UserDocumentType {
  Folder = 0,
  File = 1,
  Root = 2,
}

interface useMutationProps {
  data?: any;
  url: string;
}

function DocumentManager() {
  setPageTitle("Document Manager");
  const api = useAxios(true);
  const [cachedDocumentTree, setCachedDocumentTree] = useState<UserDocument>();
  const [currentFolder, setCurrentFolder] = useState<UserDocument>();
  const [currentFolderData, setcurrentFolderData] = useState<
    UserDocumentData[]
  >([]);
  const emptyId: UUID = "00000000-0000-0000-0000-000000000000";
  const onCurrentFolderSelect = (doc: UserDocument) => {
    //setcurrentFolderData] = useState<UserDocumentData[]
    if (doc.documents) {
      var list: UserDocumentData[] = [];
      doc.documents
        .sort((a, b) => {
          if (a?.documentType != b?.documentType)
            return a?.documentType == UserDocumentType.Folder ? -1 : 1;
          else
            return a?.display < b?.display
              ? -1
              : a?.display > b?.display
              ? 1
              : 0;
        })
        .map((m) =>
          list.push({
            id: m.id,
            documentType: m.documentType
              ? m.documentType
              : UserDocumentType.Folder,
            name: m.display,
            isSelected: false,
            size: m.size ? m.size : 0,
            modified: m.modifiedDateTimeStr ? m.modifiedDateTimeStr : "",
          })
        );
      setcurrentFolderData(list);
    } else {
      setcurrentFolderData([]);
    }
    setCurrentFolder(doc);
  };

  const { GetDirectory } = useDocuments();

  const downloadFile = (id: UUID) => {
    try {
      //const response = await axios.get("Documents/GetDownloadUrl/" + id);
      //const url = response.data as string;
      location.href = "Documents/GetDownloadUrl/" + id;
      //      window.open(url, "_blank", "rel=noopener noreferrer");
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };
  const findCurrentFolder = (id: UUID, collection: UserDocument[]) => {
    var fol = null;
    collection.forEach((element) => {
      if (element.id == id) fol = element;
      else if (element.documents != null)
        fol = findCurrentFolder(id, element.documents);
      else return null;
    });
    return fol;
  };

  //use state to declare data that changes
  const {
    data: documentTree,
    isLoading,
    error,
      refetch
  } = GetDirectory();
  useEffect(() => {
    if(documentTree){
        var root = documentTree[0];
        if (root != null) {
          buildParent(root);
        }
        var curFolder = null;

        if (currentFolder != null && currentFolder.id != null) {
          curFolder = findCurrentFolder(currentFolder.id, documentTree as UserDocument[]);
        }
        if (curFolder == null) curFolder = root;
        onCurrentFolderSelect(curFolder);
        setCachedDocumentTree(root);
    }
  }, [documentTree]);

  const buildParent = (doc: UserDocument) =>{
    if (doc.documents != null && doc.documents.length > 0) {
      doc.documents.forEach((element) => {
        element.parent = doc;
        if (element.documentType == UserDocumentType.Folder) {
          buildParent(element);
          doc.documents = doc.documents?.sort((f, n) => {
            if (f.documentType == n.documentType) {
              return f.name < n.name ? 0 : 1;
            } else if (f.documentType == UserDocumentType.Folder) return 0;
            else return 1;
          });
        }else {
          return;
        }
      });
    }
  };

  var onCellClick = function (e: any, curObject: UserDocument) {
    //setData(data.map((item, i) => (i === index ? item + i.toString() : item)));
  };

  const { isAdmin } = useAuth();

  return (
    <>
      <FileBrowser
        documentTree={cachedDocumentTree}
        refreshdocumentList={refetch}
        onDownloadFile={downloadFile}
        onCurrentFolderSelect={onCurrentFolderSelect}
        currentFolder={currentFolder}
        currentFolderData={currentFolderData}
        api={api}
        isLoading={isLoading}
        isReadWrite={isAdmin}
      />
    </>
  );
}

export default DocumentManager;
