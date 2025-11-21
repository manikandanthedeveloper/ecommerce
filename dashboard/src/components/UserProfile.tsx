import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { MdLogout, MdPerson, MdSettings } from 'react-icons/md'

const UserProfile: React.FC<{ showProfile: boolean, setShowProfile: React.Dispatch<React.SetStateAction<boolean>>, handleLogout: () => void }> = ({ showProfile, setShowProfile, handleLogout }) => {
    const profileRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate();
    const user = { name: "Manikandan D", email: "manikandan@example.com" };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return <div className="relative" ref={profileRef}>
        <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
            <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
            </div>
            <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                    {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
            </div>
        </button>

        {/* Profile Dropdown */}
        {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">
                        {user?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {user?.email || 'admin@example.com'}
                    </p>
                </div>
                <div className="py-2">
                    <button
                        onClick={() => navigate('/admin/profile')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <MdPerson className="text-lg" />
                        <span>My Profile</span>
                    </button>
                    <button
                        onClick={() => navigate('/admin/settings')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <MdSettings className="text-lg" />
                        <span>Settings</span>
                    </button>
                </div>
                <div className="border-t border-gray-200 pt-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <MdLogout className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        )}
    </div>
}

export default UserProfile