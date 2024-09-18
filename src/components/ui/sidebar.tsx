import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {useMsal} from "@azure/msal-react";
import useAuth from "@/hooks/use-auth";
import Logo from "@/assets/LogoFull_white.svg";
import LogoIcon from "@/assets/LogoTyre_White.svg";
import {Icons} from "@/components/icons";
import {Label} from "@/components/ui/label";
import Tooltip from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

interface SidebarProps {
    onClick?: () => void;
    sidebarOpen?: boolean;
}

interface MenuItemInterface {
    label: string,
    link: string,
    isActive: boolean | undefined,
    children?: MenuItemInterface[],
    icon: React.ReactNode,
}

export function Sidebar({sidebarOpen, onClick}: SidebarProps) {
    const {instance: identityInstance} = useMsal();
    const isElevatedUser = true; //replace with role logic
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    const location = useLocation();
    const {isAdmin, canViewSalesLog} = useAuth();
    const [isMobileView, setMobileView] = useState(false);
    const {policyId} = useParams();

    useEffect(() => {
        const handleResize = () => setMobileView(window.innerWidth <= 768);
        handleResize(); // Set the initial value based on the current window width
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSubmenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobileView) {
            e.stopPropagation();
            e.preventDefault();
            setSubmenuOpen(!isSubmenuOpen);
        }
    };
    const menuItems: MenuItemInterface[] = [
        {
            label: 'Dashboard',
            icon: Icons.grid(20, 20),
            link: '/',
            isActive: true
        },
        {
            label: 'Policies',
            link: '/policy',
            icon: Icons.clipboardTask(20, 20),
            isActive: true,
            children: [
                {
                    label: 'Employee Handbook',
                    link: '/policy/category/1',
                    icon: Icons.book(20, 20),
                    isActive: true,
                },
                {
                    label: 'Health & Safety Policies',
                    link: '/policy/category/2',
                    icon: Icons.clipboardPulse(20, 20),
                    isActive: true,
                },
                {
                    label: 'Standard Operating Procedures',
                    link: '/policy/category/3',
                    icon: Icons.bulletSquare(20, 20),
                    isActive: true,
                },
                {
                    label: 'Additional Policies',
                    link: '/policy/category/4',
                    icon: Icons.clipboardTaskAdd(20, 20),
                    isActive: true,
                }
            ]
        },
        {
            label: 'Document Manager',
            icon: Icons.folderOpen(20, 20),
            link: '/document-manager',
            isActive: true
        },

        {
            label: 'Commission',
            icon: Icons.moneyCalculator(20, 20),
            link: '/commission',
            isActive: true
        },
        {
            label: 'Sales Log',
            link: '/sales-log',
            icon: Icons.arrowGrowth(20, 20),
            isActive: canViewSalesLog
        },
        {
            label: "Employees",
            link: '/employees',
            icon: Icons.peopleTeam(20, 20),
            isActive: isAdmin || canViewSalesLog
        },
        {
            label: "Sales Plan",
            link: '/sales-plans',
            icon: Icons.dataTrending(20, 20),
            isActive: isAdmin
        },
        {
            label: "Report",
            link: '/report',
            icon: Icons.dataPie(20, 20),
            isActive: true,
        },

    ]

    const isActive = (navItem: MenuItemInterface) => {
        const url = location.pathname;
        const newUrl = policyId ? url.replace(`/${policyId}`, "") : url;
        if (navItem.children) {
            let found = navItem.children.find((child: MenuItemInterface) => child.link === newUrl);
            return !!found;
        } else {
            return newUrl === navItem.link
        }
    }

    const handleMenuItemClick = () => {
        setSubmenuOpen(false);
        if (isMobileView && onClick) {
            onClick()
        }
    }
    return (
        <div
            className={`fixed top-0 bottom-0 z-50 bg-primary-950 border-r border-white-translucent transition-all duration-200 ${sidebarOpen ? 'w-full md:w-[248px]' : 'w-[72px] -translate-x-full md:translate-x-0'}`}>
            <nav aria-label="Sidebar">
                <div
                    className={`p-4 max-md:py-2 shadow-[inset_0_-1px_0_var(--white-translucent)] overflow-hidden flex justify-between items-center`}>
                    <img src={sidebarOpen ? Logo : LogoIcon} alt='Company logo' className="max-w-max h-7"/>
                    <Button onClick={onClick} variant={'subtle'} size={'icon'}
                            className="w-8 h-8 text-white rounded-full md:hidden block">{Icons.dismiss()}</Button>
                </div>
                <span onClick={onClick}
                      className="max-md:hidden bg-accent text-white rounded cursor-pointer p-1 absolute -right-3 top-4">
                            <span>{sidebarOpen ? Icons.arrowLeft() : Icons.arrowRight()}</span>
                        </span>
                <div
                    className="flex flex-col gap-2 p-4 max-md:py-2 h-[calc(100vh-48px)] sm:h-[calc(100vh-112px)] no-scrollbar text-100">
                    {menuItems && menuItems.map((item) => (
                        item.isActive &&
                        <div key={item.link}>
                            <Tooltip side={'right'} text={item.label} hide={sidebarOpen || isSubmenuOpen}>
                                {item.children ?
                                    <div onMouseEnter={() => setSubmenuOpen(true)}
                                         onMouseLeave={() => setSubmenuOpen(false)} onClick={toggleSubmenu}
                                         className={`w-full cursor-pointer text-white relative`}>
                                        <div
                                            className={`flex items-center w-full rounded gap-2 p-2.5 ${isActive(item) ? 'bg-primary' : 'hover:bg-primary-900'}`}>
                                            <span>{item.icon}</span>
                                            {sidebarOpen &&
                                                <Label
                                                    size="md"
                                                    className="flex flex-1 items-center justify-between cursor-pointer">{item.label}
                                                    <span
                                                        className={`md:-rotate-90 ${isSubmenuOpen && '-rotate-180'}`}>{Icons.chevronDown()}</span>
                                                </Label>}
                                        </div>
                                        {isSubmenuOpen &&
                                            <div
                                                className={`${!isMobileView ? "absolute left-full w-[304px] top-0 pl-5" : "pl-3 pt-3"}`}>
                                                <div
                                                    className={`${isMobileView ? "border-l border-white-translucent pl-2" : "p-2"} bg-primary-950 rounded shadow-md space-y-1`}>
                                                    {item?.children?.map((childItem) => (
                                                        <NavLink to={childItem.link}
                                                                 key={childItem.link}
                                                                 onClick={handleMenuItemClick}
                                                                 className={`gap-2 flex items-center p-2.5 rounded w-full cursor-pointer text-white 
                                                               ${isActive(childItem) ? 'bg-primary-translucent !text-primary-300' : 'hover:bg-primary-900'}`
                                                                 }>
                                                            <span>{childItem.icon}</span>
                                                            <Label size="md" className="cursor-pointer">{childItem.label}</Label>
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div> :
                                    <NavLink to={item.link}
                                             onClick={handleMenuItemClick}
                                             className={`flex items-center group px-2.5 h-10 rounded cursor-pointer gap-2 text-white 
                                                 ${isActive(item) ? 'bg-primary' : 'hover:bg-primary-900'}`}>
                                        <span className="group-[.bg-primary]:text-white">{item.icon}</span>
                                        {sidebarOpen &&
                                            <Label
                                                size="md"
                                                className="cursor-pointer whitespace-nowrap">
                                                {item.label}</Label>}
                                    </NavLink>
                                }
                            </Tooltip>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
}
