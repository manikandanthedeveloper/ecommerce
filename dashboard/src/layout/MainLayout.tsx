import { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null!);

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
    //             setIsCollapsed(!isCollapsed);
    //         }

    //     }

    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => document.removeEventListener('mousedown', handleClickOutside)
    // })

    return (
        <div className="bg-[#f5f5f5] min-h-screen w-full">
            <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} sidebarRef={sidebarRef} />
            <main className="ml-0 md:ml-64 sm:ml-0 mt-25 md:mt-16 p-6 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout