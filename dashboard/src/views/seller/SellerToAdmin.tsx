import { useState } from 'react';
import { MdSend, MdAttachFile, MdMoreVert, MdPhone, MdVideocam, MdInfo } from 'react-icons/md';

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    text: string;
    timestamp: string;
    isRead: boolean;
    isSender: boolean;
}

const SellerToAdmin = () => {
    const [messageInput, setMessageInput] = useState('');

    // Admin details
    const admin = {
        id: 'admin',
        name: 'Admin Support',
        role: 'System Administrator',
        avatar: 'AS',
        isOnline: true,
    };

    // Mock messages with admin
    const messages: Message[] = [
        {
            id: '1',
            senderId: 'seller',
            senderName: 'You',
            text: 'Hello, I need some assistance with my store.',
            timestamp: '10:30 AM',
            isRead: true,
            isSender: true,
        },
        {
            id: '2',
            senderId: 'admin',
            senderName: 'Admin',
            text: 'Hi! Of course, I\'d be happy to help. What do you need assistance with?',
            timestamp: '10:32 AM',
            isRead: true,
            isSender: false,
        },
        {
            id: '3',
            senderId: 'seller',
            senderName: 'You',
            text: 'I\'m having trouble updating my product inventory. The system keeps showing an error.',
            timestamp: '10:35 AM',
            isRead: true,
            isSender: true,
        },
        {
            id: '4',
            senderId: 'admin',
            senderName: 'Admin',
            text: 'Let me check that for you. Can you provide the error message you\'re seeing?',
            timestamp: '10:37 AM',
            isRead: true,
            isSender: false,
        },
        {
            id: '5',
            senderId: 'seller',
            senderName: 'You',
            text: 'It says "Unable to update inventory. Please try again later."',
            timestamp: '10:40 AM',
            isRead: true,
            isSender: true,
        },
        {
            id: '6',
            senderId: 'admin',
            senderName: 'Admin',
            text: 'Thank you for the information. I\'ll look into this issue and get back to you shortly.',
            timestamp: '10:42 AM',
            isRead: true,
            isSender: false,
        },
    ];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim()) {
            // Here you would typically send the message to the backend
            console.log('Sending message:', messageInput);
            setMessageInput('');
        }
    };

    return (
        <div className="flex h-[calc(100vh-120px)] bg-gray-50">
            {/* Chat Area - Full Width */}
            <div className="flex-1 flex flex-col w-full">
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                    {admin.avatar}
                                </div>
                                {admin.isOnline && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">{admin.name}</h3>
                                <p className="text-sm text-gray-500">{admin.role}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <button className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MdPhone className="text-xl" />
                            </button>
                            <button className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MdVideocam className="text-xl" />
                            </button>
                            <button className="hidden md:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MdInfo className="text-xl" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MdMoreVert className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {/* Welcome Message */}
                    <div className="text-center py-4">
                        <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-600">
                                Chat with admin support for any assistance
                            </p>
                        </div>
                    </div>

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-md lg:max-w-lg ${message.isSender ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                {/* Avatar for received messages */}
                                {!message.isSender && (
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                        {admin.avatar}
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div>
                                    <div
                                        className={`px-4 py-2 rounded-2xl ${message.isSender
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
                <div className="bg-white border-t border-gray-200 p-4">
                    <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
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
                                placeholder="Type your message to admin..."
                                rows={1}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MdSend className="text-xl" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellerToAdmin