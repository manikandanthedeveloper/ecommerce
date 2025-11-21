import React from 'react'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

export const ToggleFullScreen: React.FC<{ toggleFullscreen: () => void; isFullscreen: boolean }> = ({ toggleFullscreen, isFullscreen }) => {
    return <button
        onClick={toggleFullscreen}
        className="hidden lg:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="Toggle Fullscreen"
    >
        {isFullscreen ? (
            <MdFullscreenExit className="text-xl" />
        ) : (
            <MdFullscreen className="text-xl" />
        )}
    </button>
}
