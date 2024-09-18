import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icons} from "@/components/icons";
import useEmployees from "@/hooks/use-employees";
import {Label} from "@/components/ui/label";
import React, {useState} from "react";
import ProfileViewDialog from "@/components/common/ProfileViewDialog";
import {ChevronDownIcon, GearIcon} from "@radix-ui/react-icons";

function ProfileSection() {
  const { logout, getDisplayName,User } = useAuth();
  const { GetCurrentProfile, GetCurrentProfileImageUrl } = useEmployees();
  const [isProfileOpen,setProfileOpen] = useState<boolean>(false);
  const {
    data: userProfilePictureUrl,
      refetch
  } = GetCurrentProfileImageUrl();

  const {
    data: userProfile,
    isLoading: userProfileIsLoading,
    error: userProfileError,
  } = GetCurrentProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <div className='flex items-center gap-2'>
        <Avatar className="h-8 w-8">
          <AvatarImage src={userProfilePictureUrl} />
          <AvatarFallback>{Icons.user()}</AvatarFallback>
        </Avatar>
        {Icons.chevronDown()}
      </div>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <div className='flex gap-2 mb-2 py-2 rounded px-3 cursor-default bg-primary-translucent'>
          <Avatar className="h-10">
            <AvatarImage src={userProfilePictureUrl} />
            <AvatarFallback>{Icons.user()}</AvatarFallback>
          </Avatar>
          <DropdownMenuLabel className="flex flex-col p-0">
            <span className="text-100 text-title-md font-semibold">{getDisplayName() || 'User'}</span>
            {User?.Roles && User.Roles.map(role => (
                <span className="text-200 text-body-sm" key={role}>{role}</span>
            ))}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuItem  onClick={() =>setProfileOpen(true)}>
          <span>{Icons.user()}</span>
          <Label size='md' className='cursor-pointer font-medium'>My Account</Label>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GearIcon className="h-4 w-4"/>
          <Label size='md' className='font-medium cursor-pointer'>Settings</Label>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={() => {
          logout();
        }}>
          <span>{Icons.signOut()}</span>
          <Label size='md' className='font-medium cursor-pointer'>Logout</Label>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isProfileOpen && (
          <ProfileViewDialog
              isProfileViewDialogOpen={isProfileOpen}
              clearProfileViewDialog={() =>setProfileOpen(false)}
              uploadPhotoClick={refetch}
              profileInfo={userProfile!}
              profileImageUrl={userProfilePictureUrl!}
          />
      )}
    </DropdownMenu>
  );
}

export default ProfileSection;
