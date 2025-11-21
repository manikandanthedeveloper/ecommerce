import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/reducers/authSlice'
import SearchBar from './SearchBar'
import Logo from './Logo'
import { ToggleFullScreen } from './ToggleFullScreen'
import Email from './Email'
import Notifications from './Notifications'
import UserProfile from './UserProfile'

const Header: React.FC<{ isCollapsed: boolean; setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)


    const handleLogout = () => {
        dispatch(logout())
        navigate('/admin/login')
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Left Section - Logo & Mobile Menu */}
                <Logo isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                {/* Center Section - Search */}
                <SearchBar cssClass="hidden md:flex flex-1 max-w-xl mx-8" />

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Fullscreen Toggle */}
                    <ToggleFullScreen toggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />

                    {/* Messages */}
                    <Email />

                    {/* Notifications */}
                    <Notifications showNotifications={showNotifications} setShowNotifications={setShowNotifications} />

                    {/* User Profile */}
                    <UserProfile showProfile={showProfile} setShowProfile={setShowProfile} handleLogout={handleLogout} />
                </div>
            </div>

            {/* Mobile Search */}
            <SearchBar cssClass="md:hidden px-4 pb-3" />
        </header>
    )
}

export default Header