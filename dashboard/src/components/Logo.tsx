import { MdMenu } from 'react-icons/md'

const Logo: React.FC<{ isCollapsed: boolean; setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isCollapsed, setIsCollapsed }) => {
    return <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setIsCollapsed(!isCollapsed)}>
            <MdMenu className="text-2xl" />
        </button>

        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="hidden sm:block text-xl font-bold text-gray-800">
                E-Shop <span className="text-blue-600">Admin</span>
            </h1>
        </div>
    </div>
}

export default Logo