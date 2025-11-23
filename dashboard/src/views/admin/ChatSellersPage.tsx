import { useState } from 'react';
import { MdSearch, MdSend, MdAttachFile, MdMoreVert, MdPhone, MdVideocam, MdInfo, MdClose, MdArrowBack } from 'react-icons/md';

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    text: string;
    timestamp: string;
    isRead: boolean;
    isSender: boolean;
}

interface Seller {
    id: string;
    name: string;
    storeName: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
}

const ChatSellersPage = () => {
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls sidebar on mobile

    // Mock sellers data
    const sellers: Seller[] = [
        {
            id: '1',
            name: 'John Smith',
            storeName: 'Tech Store',
            avatar: 'JS',
            lastMessage: 'Thank you for your help!',
            lastMessageTime: '2m ago',
            unreadCount: 2,
            isOnline: true,
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            storeName: 'Fashion Hub',
            avatar: 'SJ',
            lastMessage: 'When can I expect the payment?',
            lastMessageTime: '1h ago',
            unreadCount: 0,
            isOnline: true,
        },
        {
            id: '3',
            name: 'Mike Wilson',
            storeName: 'Electronics Plus',
            avatar: 'MW',
            lastMessage: 'I have updated the product listings',
            lastMessageTime: '3h ago',
            unreadCount: 5,
            isOnline: false,
        },
        {
            id: '4',
            name: 'Emily Brown',
            storeName: 'Home Decor',
            avatar: 'EB',
            lastMessage: 'Can you help with shipping?',
            lastMessageTime: '1d ago',
            unreadCount: 1,
            isOnline: false,
        },
        {
            id: '5',
            name: 'David Lee',
            storeName: 'Sports Gear',
            avatar: 'DL',
            lastMessage: 'Order has been processed',
            lastMessageTime: '2d ago',
            unreadCount: 0,
            isOnline: true,
        },
    ];

    // Mock messages for selected seller
    const messages: Message[] = selectedSeller ? [
        {
            id: '1',
            senderId: selectedSeller.id,
            senderName: selectedSeller.name,
            text: 'Hello, I need some assistance with my store.',
            timestamp: '10:30 AM',
            isRead: true,
            isSender: false,
        },
        {
            id: '2',
            senderId: 'admin',
            senderName: 'Admin',
            text: 'Hi! Of course, I\'d be happy to help. What do you need assistance with?',
            timestamp: '10:32 AM',
            isRead: true,
            isSender: true,
        },
        {
            id: '3',
            senderId: selectedSeller.id,
            senderName: selectedSeller.name,
            text: 'I\'m having trouble updating my product inventory. The system keeps showing an error.',
            timestamp: '10:35 AM',
            isRead: true,
            isSender: false,
        },
        {
            id: '4',
            senderId: 'admin',
            senderName: 'Admin',
            text: 'Let me check that for you. Can you provide the error message you\'re seeing?',
            timestamp: '10:37 AM',
            isRead: true,
            isSender: true,
        },
        {
            id: '5',
            senderId: selectedSeller.id,
            senderName: selectedSeller.name,
            text: 'Thank you for your help!',
            timestamp: '10:45 AM',
            isRead: true,
            isSender: false,
        },
    ] : [];

    const filteredSellers = sellers.filter(seller =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.storeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim() && selectedSeller) {
            // Here you would typically send the message to the backend
            console.log('Sending message:', messageInput);
            setMessageInput('');
        }
    };

    return (
        <div className="flex h-[calc(100vh-120px)] bg-gray-50 relative">
            {/* Mobile Overlay */}
            {(isSidebarOpen || !selectedSeller) && selectedSeller && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sellers List Sidebar */}
            <div className={`
                w-full sm:w-80 lg:w-80 bg-white border-r border-gray-200 flex flex-col
                fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
                h-full lg:h-auto
                ${(!selectedSeller || !selectedSeller.id || isSidebarOpen) ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                {/* Search Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
                        <button
                            onClick={() => {
                                if (selectedSeller) {
                                    setIsSidebarOpen(false);
                                } else {
                                    // If no seller selected, select a dummy to hide sidebar
                                    setSelectedSeller({} as Seller);
                                }
                            }}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MdClose className="text-xl" />
                        </button>
                    </div>
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search sellers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Sellers List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredSellers.map((seller) => (
                        <div
                            key={seller.id}
                            onClick={() => {
                                setSelectedSeller(seller);
                                setIsSidebarOpen(false);
                            }}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedSeller?.id === seller.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                }`}
                        >
                            <div className="flex items-start space-x-3">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {seller.avatar}
                                    </div>
                                    {seller.isOnline && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>

                                {/* Seller Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900 truncate">{seller.name}</h3>
                                        <span className="text-xs text-gray-500 ml-2">{seller.lastMessageTime}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1 truncate">{seller.storeName}</p>
                                    <p className="text-sm text-gray-500 truncate">{seller.lastMessage}</p>
                                </div>

                                {/* Unread Badge */}
                                {seller.unreadCount > 0 && (
                                    <div className="shrink-0">
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                                            {seller.unreadCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col w-full ${!selectedSeller || !selectedSeller.id ? 'hidden lg:flex' : ''}`}>
                {selectedSeller && selectedSeller.id ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    {/* Menu Button for Mobile */}
                                    <button
                                        onClick={() => setIsSidebarOpen(true)}
                                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
                                    >
                                        <MdArrowBack className="text-xl" />
                                    </button>
                                    <div className="relative shrink-0">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {selectedSeller.avatar}
                                        </div>
                                        {selectedSeller.isOnline && (
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{selectedSeller.name}</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 truncate">{selectedSeller.storeName}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <button className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MdPhone className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MdVideocam className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="hidden md:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MdInfo className="text-lg sm:text-xl" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MdMoreVert className="text-lg sm:text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end space-x-1.5 sm:space-x-2 max-w-[85%] sm:max-w-md lg:max-w-lg ${message.isSender ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        {/* Avatar for received messages */}
                                        {!message.isSender && (
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                                {selectedSeller.avatar}
                                            </div>
                                        )}

                                        {/* Message Bubble */}
                                        <div>
                                            <div
                                                className={`px-3 py-2 sm:px-4 rounded-2xl ${message.isSender
                                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                                                    }`}
                                            >
                                                <p className="text-sm wrap-break-word">{message.text}</p>
                                            </div>
                                            <span className={`text-xs text-gray-500 mt-1 block ${message.isSender ? 'text-right' : 'text-left'}`}>
                                                {message.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
                            <form onSubmit={handleSendMessage} className="flex items-end space-x-1.5 sm:space-x-2">
                                <button
                                    type="button"
                                    className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <MdAttachFile className="text-xl" />
                                </button>
                                <div className="flex-1">
                                    <textarea
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type your message..."
                                        rows={1}
                                        className="w-full px-3 py-2 sm:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!messageInput.trim()}
                                    className="p-2.5 sm:p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MdSend className="text-lg sm:text-xl" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    /* Empty State - Desktop Only */
                    <div className="flex flex-1 items-center justify-center bg-gray-50">
                        <div className="text-center px-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MdSend className="text-4xl sm:text-5xl text-gray-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Conversation Selected</h3>
                            <p className="text-sm sm:text-base text-gray-500">Select a seller from the list to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSellersPage;