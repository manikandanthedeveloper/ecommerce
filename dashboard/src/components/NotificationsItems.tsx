import React from 'react'
import type { Notification } from '../models/Notification'

const NotificationsItems: React.FC<{ notification: Notification }> = ({ notification }) => {
    return <div
        key={notification.id}
        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${notification ? 'bg-blue-50' : ''
            }`}
    >
        <div className="flex items-start gap-3">
            <div className={`mt-1 w-2 h-2 rounded-full ${notification.unread ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
            <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800">
                    {notification.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                    {notification.message}
                </p>
                <span className="text-xs text-gray-400 mt-1 block">
                    {notification.time}
                </span>
            </div>
        </div>
    </div>
}

export default NotificationsItems