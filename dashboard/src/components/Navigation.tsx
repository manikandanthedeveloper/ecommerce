import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { MenuItem } from '../models/MenuItem';

const Navigation: React.FC<{ item: MenuItem; isCollapsed: boolean }> = ({ item, isCollapsed }) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/')
    }

    return <Link
        to={item.path}
        className={`flex items-center justify-between px-3 py-2.5 rounded-lg  duration-500 hover:pl-4 transition-colors ${isActive(item.path)
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-50'
            }`}
    >
        <div className="flex items-center gap-3">
            <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}>
                {item.icon}
            </span>
            {!isCollapsed && (
                <span className="font-medium">{item.title}</span>
            )}
        </div>
        {!isCollapsed && item.badge && (
            <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                {item.badge}
            </span>
        )}
    </Link>
}

export default Navigation