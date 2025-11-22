import { useEffect, useRef } from "react";
import { MdNotifications } from "react-icons/md";
import NotificationsItems from "./NotificationsItems";

// Mock notifications
const notifications = [
    { id: 1, title: 'New Order #1234', message: 'You have received a new order', time: '2 min ago', unread: true },
    { id: 2, title: 'Low Stock Alert', message: 'Product "iPhone 15" is running low', time: '1 hour ago', unread: true },
    { id: 3, title: 'Customer Review', message: 'New 5-star review on Product #567', time: '3 hours ago', unread: false },
    { id: 4, title: 'Payment Received', message: 'Order #1230 payment confirmed', time: '5 hours ago', unread: false }
]

const unreadCount = notifications.filter(n => n.unread).length

const Notifications: React.FC<{
    showNotifications: boolean;
    setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showNotifications, setShowNotifications }) => {
    const notificationRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return <div className="relative" ref={notificationRef}>
        <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Notifications"
        >
            <MdNotifications className="text-xl" />
            {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount}
                </span>
            )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                        Mark all as read
                    </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                        <NotificationsItems key={notification.id} notification={notification} />
                    ))}
                </div>
                <div className="px-4 pt-2 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1">
                        View all notifications
                    </button>
                </div>
            </div>
        )}
    </div>
}

export default Notifications