import { useState } from 'react';
import { MdEdit, MdCamera, MdStore, MdPerson, MdEmail, MdPhone, MdLocationOn, MdLock, MdVerifiedUser, MdAccountBalance } from 'react-icons/md';

const Profile = () => {
    // Account & Status Info (Read-only)
    const accountInfo = {
        role: 'Seller',
        status: 'Active',
        accountCreated: 'January 15, 2024',
        lastLogin: 'November 23, 2025',
        accountId: 'SEL-2024-001234',
    };

    // Personal Information State
    const [personalInfo, setPersonalInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main Street, New York, NY 10001',
    });

    // Shop Information State
    const [shopInfo, setShopInfo] = useState({
        shopName: 'Tech Electronics Store',
        shopAddress: '456 Business Ave, New York, NY 10002',
        shopDescription: 'We specialize in high-quality electronics and gadgets. Our mission is to provide the best products at competitive prices.',
        shopEmail: 'contact@techelectronics.com',
        shopPhone: '+1 234 567 8901',
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Edit Mode States
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isEditingShop, setIsEditingShop] = useState(false);

    // Profile Image
    const [profileImage, setProfileImage] = useState<string>('');
    const [shopLogo, setShopLogo] = useState<string>('');

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPersonalInfo({
            ...personalInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleShopInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setShopInfo({
            ...shopInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleShopLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShopLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePersonalInfo = (e: React.FormEvent) => {
        e.preventDefault();
        // API call to save personal info
        console.log('Saving personal info:', personalInfo);
        setIsEditingPersonal(false);
    };

    const handleSaveShopInfo = (e: React.FormEvent) => {
        e.preventDefault();
        // API call to save shop info
        console.log('Saving shop info:', shopInfo);
        setIsEditingShop(false);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
        // API call to change password
        console.log('Changing password');
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h1>

            <div className="space-y-6">
                {/* Account Information Section (Read-only) */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <MdAccountBalance className="text-2xl text-green-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Role */}
                            <div className="flex items-start space-x-3">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <MdVerifiedUser className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Role</p>
                                    <p className="text-lg font-semibold text-gray-900">{accountInfo.role}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start space-x-3">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Account Status</p>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                        {accountInfo.status}
                                    </span>
                                </div>
                            </div>

                            {/* Account ID */}
                            <div className="flex items-start space-x-3">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <MdAccountBalance className="text-2xl text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Account ID</p>
                                    <p className="text-lg font-semibold text-gray-900 font-mono">{accountInfo.accountId}</p>
                                </div>
                            </div>

                            {/* Account Created */}
                            <div className="flex items-start space-x-3">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Member Since</p>
                                    <p className="text-lg font-semibold text-gray-900">{accountInfo.accountCreated}</p>
                                </div>
                            </div>

                            {/* Last Login */}
                            <div className="flex items-start space-x-3">
                                <div className="p-3 bg-indigo-100 rounded-lg">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Last Login</p>
                                    <p className="text-lg font-semibold text-gray-900">{accountInfo.lastLogin}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MdPerson className="text-2xl text-blue-600" />
                                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                            </div>
                            <button
                                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <MdEdit className="text-lg" />
                                <span>{isEditingPersonal ? 'Cancel' : 'Edit'}</span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSavePersonalInfo} className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            personalInfo.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    {isEditingPersonal && (
                                        <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                            <MdCamera className="text-white text-xl" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProfileImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <p className="mt-3 text-sm text-gray-600">Profile Picture</p>
                            </div>

                            {/* Personal Info Fields */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={personalInfo.name}
                                        onChange={handlePersonalInfoChange}
                                        disabled={!isEditingPersonal}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={personalInfo.email}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditingPersonal}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <div className="relative">
                                        <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={personalInfo.phone}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditingPersonal}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <div className="relative">
                                        <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={personalInfo.address}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditingPersonal}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isEditingPersonal && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Shop Information Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MdStore className="text-2xl text-purple-600" />
                                <h2 className="text-xl font-semibold text-gray-800">Shop Information</h2>
                            </div>
                            <button
                                onClick={() => setIsEditingShop(!isEditingShop)}
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <MdEdit className="text-lg" />
                                <span>{isEditingShop ? 'Cancel' : 'Edit'}</span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSaveShopInfo} className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Shop Logo */}
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                                        {shopLogo ? (
                                            <img src={shopLogo} alt="Shop Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <MdStore className="text-5xl" />
                                        )}
                                    </div>
                                    {isEditingShop && (
                                        <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                                            <MdCamera className="text-white text-xl" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleShopLogoChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <p className="mt-3 text-sm text-gray-600">Shop Logo</p>
                            </div>

                            {/* Shop Info Fields */}
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Name
                                        </label>
                                        <input
                                            type="text"
                                            name="shopName"
                                            value={shopInfo.shopName}
                                            onChange={handleShopInfoChange}
                                            disabled={!isEditingShop}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Email
                                        </label>
                                        <div className="relative">
                                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                name="shopEmail"
                                                value={shopInfo.shopEmail}
                                                onChange={handleShopInfoChange}
                                                disabled={!isEditingShop}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Phone
                                        </label>
                                        <div className="relative">
                                            <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="shopPhone"
                                                value={shopInfo.shopPhone}
                                                onChange={handleShopInfoChange}
                                                disabled={!isEditingShop}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Address
                                        </label>
                                        <div className="relative">
                                            <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                name="shopAddress"
                                                value={shopInfo.shopAddress}
                                                onChange={handleShopInfoChange}
                                                disabled={!isEditingShop}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shop Description
                                    </label>
                                    <textarea
                                        name="shopDescription"
                                        value={shopInfo.shopDescription}
                                        onChange={handleShopInfoChange}
                                        disabled={!isEditingShop}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditingShop && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Change Password Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <MdLock className="text-2xl text-red-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
                        </div>
                    </div>

                    <form onSubmit={handleChangePassword} className="p-6">
                        <div className="max-w-md space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;