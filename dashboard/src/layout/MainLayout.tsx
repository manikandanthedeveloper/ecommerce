import { useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(true) // Collapsed by default for mobile
    const sidebarRef = useRef<HTMLDivElement>(null!);

    return (
        <div className="bg-[#f5f5f5] min-h-screen w-full">
            <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} sidebarRef={sidebarRef} />
            <main className={`mt-25 md:mt-16 p-6 transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'
                }`}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout