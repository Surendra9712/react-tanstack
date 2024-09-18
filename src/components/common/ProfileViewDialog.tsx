import React from "react";
import {Label} from "../ui/label";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {IProfileViewDialog} from "@/interfaces/IProfileViewDialog";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {CircularIcon} from "@/components/ui/icon";
import {Icons} from "@/components/icons";
import {ContentBody} from "@/components/ui/contentBody";
import {HorizontalDivider} from "@/components/ui/divider";
import useEmployees from "@/hooks/use-employees";
import {toast} from "@/components/ui/use-toast";

const ProfileViewDialog: React.FC<IProfileViewDialog> = ({
                                                             isProfileViewDialogOpen,
                                                             clearProfileViewDialog,
                                                             profileInfo,
                                                             profileImageUrl,
                                                             uploadPhotoClick
                                                         }) => {
    const {SetProfileImage} = useEmployees();


    const {
        status: statusSetProfileImage,
        error: errorSetProfileImage,
        mutate: mutateSetProfileImage,
    } = SetProfileImage();

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => handleFileUpload(input);
        input.click();
    };

    const handleFileUpload = async (input: any) => {
        const file = input.files[0];
        // Check if a file was selected
        if (file) {
            mutateSetProfileImage(file, {
                onSuccess: () => {
                    uploadPhotoClick()
                    toast({message: "Profile photo set successfully."}); // Show success alert
                },
                onError: (errorSetProfileImage: any) => {
                    toast({message: "Error uploading file. Please try again.", toastType: 'error'});
                },
            });
        }
    };
    return (
        <>
            <Dialog open={isProfileViewDialogOpen} onOpenChange={clearProfileViewDialog}>
                <DialogContent className="max-w-[500px]">
                    <DialogHeader>
                        <div className="flex gap-4 items-center">
                            <div>
                                <CircularIcon>{Icons.person(20, 20)}</CircularIcon>
                            </div>
                            <DialogTitle>User Profile</DialogTitle>
                        </div>
                    </DialogHeader>
                    <Card className="md:p-6 p-4 max-h-[calc(100vh-112px)] overflow-y-auto tiny-scrollbar mb-1">
                        <CardHeader className="md:px-0 p-0 pb-4">
                            <div className="flex gap-4 items-center">
                                <div className="relative group cursor-pointer" onClick={handleUpload}>
                                    <Avatar className="w-14 h-14">
                                        <AvatarImage src={profileImageUrl}/>
                                        <AvatarFallback>{profileInfo.employeeName ?
                                            `${profileInfo.employeeName.split(' ')[0].charAt(0)}${profileInfo.employeeName.split(' ')[1]?.charAt(0)}`.toUpperCase()
                                            : ''}</AvatarFallback>
                                    </Avatar>
                                    <span
                                        className="absolute w-full h-full rounded-full bg-[color:rgba(30,31,35,0.4)] text-white justify-center flex items-center top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg viewBox="0 0 32 32" width="24" height="24"
                                             xmlns="http://www.w3.org/2000/svg"><g
                                            id="camera"><path clipRule="evenodd"
                                                              d="M16,10.001c-4.419,0-8,3.581-8,8c0,4.418,3.581,8,8,8   c4.418,0,8-3.582,8-8C24,13.583,20.418,10.001,16,10.001z M20.555,21.906c-2.156,2.516-5.943,2.807-8.459,0.65   c-2.517-2.156-2.807-5.944-0.65-8.459c2.155-2.517,5.943-2.807,8.459-0.65C22.42,15.602,22.711,19.391,20.555,21.906z"
                                                              fill="currentColor" fillRule="evenodd"/>
                                            <path clipRule="evenodd"
                                                  d="M16,14.001c-2.209,0-3.999,1.791-4,3.999v0.002   c0,0.275,0.224,0.5,0.5,0.5s0.5-0.225,0.5-0.5V18c0.001-1.656,1.343-2.999,3-2.999c0.276,0,0.5-0.224,0.5-0.5   S16.276,14.001,16,14.001z"
                                                  fill="currentColor" fillRule="evenodd"/>
                                            <path clipRule="evenodd"
                                                  d="M29.492,9.042l-4.334-0.723l-1.373-3.434   C23.326,3.74,22.232,3,21,3H11C9.768,3,8.674,3.74,8.214,4.886L6.842,8.319L2.509,9.042C1.055,9.283,0,10.527,0,12v15   c0,1.654,1.346,3,3,3h26c1.654,0,3-1.346,3-3V12C32,10.527,30.945,9.283,29.492,9.042z M30,27c0,0.553-0.447,1-1,1H3   c-0.553,0-1-0.447-1-1V12c0-0.489,0.354-0.906,0.836-0.986l5.444-0.907l1.791-4.478C10.224,5.25,10.591,5,11,5h10   c0.408,0,0.775,0.249,0.928,0.629l1.791,4.478l5.445,0.907C29.646,11.094,30,11.511,30,12V27z"
                                                  fill="currentColor"
                                                  fillRule="evenodd"/></g></svg>
                                    </span>
                                    <span
                                        className="absolute bg-gray-50 w-5 h-5 rounded-full flex justify-center items-center right-0 bottom-0">{profileImageUrl ? Icons.pen(12, 12) : Icons.addCircle(12, 12)}</span>
                                </div>

                                <div>
                                    <CardTitle>{profileInfo.employeeName}</CardTitle>
                                    <div className="flex flex-wrap gap-x-2">
                                        {profileInfo?.userRoles && profileInfo.userRoles.map((role, index,) => (
                                            <ContentBody
                                                key={role.id}>{role.name} {index !== (profileInfo.userRoles && profileInfo.userRoles.length - 1) && ','}</ContentBody>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </CardHeader>
                        <HorizontalDivider/>
                        <CardContent className="space-y-4 md:px-0 p-0 pt-4">
                            <div className="flex justify-between items-center gap-3">
                                <Label weight="medium">Employee ID</Label>
                                <ContentBody size="lg">{profileInfo.id}</ContentBody>
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                <Label weight="medium">Email</Label>
                                <ContentBody size="lg" className="truncate">{profileInfo.email}</ContentBody>
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                <Label weight="medium">Reports To</Label>
                                <ContentBody size="lg" className="truncate">{profileInfo.reportsTo?.name}</ContentBody>
                            </div>
                            <div>
                                <Label weight="medium">Manager Of</Label>
                                <Card className="border px-4 mt-3">
                                    {profileInfo.managerOf?.map((manager, index) => (
                                        <ContentBody size="lg" key={index}
                                                     className="border-b py-2 last:border-b-0">{manager.name}</ContentBody>
                                    ))}
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProfileViewDialog;
