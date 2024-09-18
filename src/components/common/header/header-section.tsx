import {Button} from "../../ui/button";
import ProfileSection from "./profile";
import BreadCrumb from "@/components/common/BreadCrumb";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import React from "react";
import Notification from "@/components/Notification/Notification";

function PageHeaderVanishing({toggleSideBar,scrollTop}: { toggleSideBar: () => void, scrollTop:number}) {
    return (
        <header className={`transition-all ${scrollTop>0&& "bg-surface-100"}`}>
            <div className="md:h-[60px] h-12 px-4 md:px-6 flex justify-between items-center border-b">
                <div className="max-md:hidden">
                    <BreadCrumb/>
                </div>
                <Button
                    variant={'outline'}
                    size={'icon'} shade={'gray'}
                    className="w-8 h-8 md:hidden block border-gray-100"
                    onClick={toggleSideBar}><HamburgerMenuIcon className="h-4 w-4"/></Button>
                <div className='flex items-center flex-1 justify-end gap-4'>
                    <Notification/>
                    <ProfileSection/>
                </div>
            </div>
            <div className={`md:hidden h-8 flex items-center px-4 transition-all ${scrollTop>0&& "shadow-[inset_0_-1px_0px_var(--gray-100)]"}`}>
                <BreadCrumb/>
            </div>
        </header>
    );
}

export default PageHeaderVanishing;
