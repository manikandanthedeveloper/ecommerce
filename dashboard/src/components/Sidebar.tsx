import { useMemo } from 'react'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import { getNavs } from '../navigation';
import Navigation from './Navigation';
import Footer from './UI/Footer';
import { useAppSelector } from '../store/hooks';

const Sidebar: React.FC<{ isCollapsed: boolean; setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>; sidebarRef: React.RefObject<HTMLDivElement> }> = ({ isCollapsed, setIsCollapsed, sidebarRef }) => {
    const { role } = useAppSelector((state) => state.auth);
    console.log('Sidebar role:', role);
    const menuItems = useMemo(() => getNavs(role || ''), [role]);

    const handleNavigationClick = () => {
        if (window.innerWidth < 768) {
            setIsCollapsed(true);
        }
    };

    return (
        <aside
            className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] mt-14 md:mt-0 bg-white shadow-lg transition-all duration-300 border-r border-gray-200 ${isCollapsed
                ? '-translate-x-full md:translate-x-0 md:w-16'
                : 'translate-x-0 w-64'
                }`}
            ref={sidebarRef}
        >
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-4 bg-blue-600 text-white rounded-full p-1 shadow-md hover:bg-blue-700 transition-colors hidden md:block"
            >
                {isCollapsed ? (
                    <MdChevronRight className="text-lg" />
                ) : (
                    <MdChevronLeft className="text-lg" />
                )}
            </button>

            {/* Sidebar Content */}
            <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.title} onClick={handleNavigationClick}>
                            <Navigation item={item} isCollapsed={isCollapsed} />
                        </div>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                {!isCollapsed && (
                    <Footer />
                )}
            </div>
        </aside>
    )
}

export default Sidebar