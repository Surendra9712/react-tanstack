import React, {useEffect} from "react";
import {Sidebar} from "../ui/sidebar";
import PageHeaderVanishing from "./header/header-section";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true); //TODO: convert to state manager
    const [scrollTop, setScrollTop] = React.useState(0);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
      handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () =>{
            if(window.innerWidth<=768){
                setIsSidebarOpen(false)
        }else {setIsSidebarOpen(true)}
    }

    const handleScroll = (e:React.MouseEvent<HTMLDivElement>)=>{
        setScrollTop(e.currentTarget.scrollTop);
    }

    return (
        <div className='layout-wrapper'>
            {/* Sidebar */}
            <Sidebar sidebarOpen={isSidebarOpen} onClick={toggleSidebar}/>
            {/*{!isSidebarOpen && <OpenSidebarBtn onClick={toggleSidebar} />}*/}

            {/* Main Content */}
            <div
                className={`bg-surface-base h-screen transition-[margin-left] duration-300 ml-0 ${isSidebarOpen ? 'md:ml-[248px]' : 'md:ml-[72px]'}`}>
                <main className="h-full">
                    <PageHeaderVanishing scrollTop={scrollTop} toggleSideBar={toggleSidebar}/>
                    {/*<BreadCrumb />*/}
                    <div onScroll={handleScroll} className="md:h-[calc(100vh-60px)] h-[calc(100vh-80px)] p-4 md:p-6 overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LayoutWrapper;
