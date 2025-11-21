import { MdEmail } from 'react-icons/md'

const Email = () => {
    return <button
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="Messages"
    >
        <MdEmail className="text-xl" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
    </button>
}

export default Email