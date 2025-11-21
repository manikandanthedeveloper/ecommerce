import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useState } from "react"

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="bg-[#f5f5f5] min-h-screen w-full">
            <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main className="ml-16 md:ml-64 mt-16 p-6 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout