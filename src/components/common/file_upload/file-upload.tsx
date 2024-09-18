import React, {ChangeEvent, useState} from "react";
import axios, {AxiosInstance} from "axios";
import {Button} from "@/components/ui/button";
import {UUID} from "crypto";
import {UserDocument} from "@/modules/documents/components/document-manager";
import {Icons} from "@/components/icons";
import {HorizontalDivider} from "@/components/ui/divider";
import {toast} from "@/components/ui/use-toast";

interface FileUploadProps {
    apiUrl: string;
    folderId?: UUID;
    api: AxiosInstance;
    cancel: () => void;
    onUpload: (success: boolean) => void;
}

export default function FileUpload({
                                       apiUrl,
                                       folderId,
                                       api,
                                       cancel,
                                       onUpload,
                                   }: FileUploadProps) {

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const getSasUrl = async (doc: UserDocument): Promise<string | null> => {
        try {
            const response = await api.post<string>(apiUrl, doc);
            return response?.data;
        } catch (error) {
            return null;
        }
    };

    const uploadFile = async () => {
        if (!file) {
            toast({title: "Please select a file first.", toastType: 'error'})
            return;
        }

        const doc: UserDocument = {
            id: folderId,
            name: file.name,
            display: file.name,
            location: "",
            size: file.size,
            contentType: file.type,
        };
        setIsUploading(true);
        const sasUrl = await getSasUrl(doc);
        if (!sasUrl) {
            toast({title: "Failed to get SAS URL.", toastType: 'error'});
            setIsUploading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.put(sasUrl, formData, {
                headers: {
                    "x-ms-blob-type": "BlockBlob",
                },
            });

            if (response.status === 200 || response.status === 201) {
                setIsUploading(false);
                onUpload(true);
                toast({title: "File uploaded successfully."});
            } else {
                setIsUploading(false)
                onUpload(false);
                toast({title: "Error uploading file.", toastType: 'error'})
            }
        } catch (error) {
            setIsUploading(false);
            onUpload(true);
            toast({title: "Upload failed.", toastType: 'error'})
        }
    };


    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
        proceedToSelectFile(e, 'DragEvent')
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        proceedToSelectFile(e, 'ChangeEvent');
    };

    const proceedToSelectFile = (event: React.DragEvent | ChangeEvent, source: 'DragEvent' | 'ChangeEvent') => {
        event.stopPropagation();
        event.preventDefault();
        let file: File | null | undefined;
        if (source === 'DragEvent') {
            file = (event as React.DragEvent).dataTransfer.files.item(0);
        } else {
            file = (event as ChangeEvent<HTMLInputElement>).target.files?.item(0);
        }
        if (file) {
            setFile(file)
        }
    }

    const fileSize = (file: File) => {
        const sizeInKB = file.size / 1024;
        const sizeInMB = sizeInKB / 1024;
        if (sizeInMB >= 1) {
            return sizeInMB.toFixed(2) + ' MB';
        } else {
            return sizeInKB.toFixed(2) + ' KB';
        }
    }

    return (
        <div className="w-full">
            <div className="w-[calc(100%-3rem)] mx-auto">
                <div
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`py-10 gap-2 border border-dashed ${isDragging ? 'border-primary' : "border-gray-200"} rounded text-200 flex justify-center items-center flex-col bg-surface-base`}>
                    <>
                        <span>{Icons.cloudArrowUp(64, 64)}</span>
                        <span className="mt-4 text-body-lg"> Drag and drop your files here</span>
                        <span className="text-body-lg">or</span>
                        <input
                            type="file"
                            id='file-upload'
                            className="hidden"
                            onChange={handleFileInputChange}
                        />

                        <label htmlFor="file-upload"
                               className="bg-primary-translucent hover:bg-primary-100 transition-colors cursor-pointer h-10 text-label-lg font-medium rounded text-primary px-4 leading-10">Browse</label>
                    </>
                </div>
                {file && <div className="border border-gray-200 rounded flex justify-between p-4 mt-4">
                    <div className="flex items-center gap-3">
                        <span>{Icons.document(32, 32)}</span>
                        <div className="flex flex-col">
                            <span className="text-body-md">{file?.name}</span>
                            <span className="text-body-sm text-300">{fileSize(file)}</span>
                        </div>
                    </div>
                    <Button variant="subtle" shade="gray" size="icon" className="h-8 w-8"
                            onClick={() => setFile(null)}>{Icons.dismiss()}</Button>
                </div>}
            </div>
            <HorizontalDivider className="mt-6"/>
            <div className="flex justify-end items-end gap-4 md:p-6 p-4">
                <Button
                    variant={'outline'}
                    shade="gray"
                    onClick={cancel}>
                    Cancel
                </Button>
                <Button
                    isLoading={isUploading}
                    type="submit"
                    onClick={uploadFile}>
                    Upload
                </Button>
            </div>
        </div>
    );
}