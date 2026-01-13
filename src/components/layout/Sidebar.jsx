import { Link, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiUser,
    FiCreditCard,
    FiPieChart,
    FiSettings,
    FiLogOut,
    FiCamera
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: FiHome },
        { name: 'My Profile', href: '/profile/edit', icon: FiUser },
        { name: 'NFC Cards', href: '/cards', icon: FiCreditCard },
        { name: 'Card Scanner', href: '/scanner', icon: FiCamera },
        { name: 'Analytics', href: '/analytics', icon: FiPieChart },
        { name: 'Settings', href: '/settings', icon: FiSettings },
    ];

    const isActive = (path) => location.pathname === path;

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-black border-r border-gray-800 text-white w-64">
            <div className="flex h-16 shrink-0 items-center px-6">
                <img src="/logo.png" alt="Soft Studio Technology" className="h-8 md:h-10 w-auto" />
            </div>
            <nav className="flex flex-1 flex-col px-4 py-4 space-y-1">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose} // Close on mobile navigation
                        className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(item.href)
                            ? 'bg-zinc-900 text-primary'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <item.icon
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive(item.href) ? 'text-primary' : 'text-gray-400 group-hover:text-white'
                                }`}
                            aria-hidden="true"
                        />
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={logout}
                    className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                    <FiLogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
                    Sign out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar: hidden on mobile */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar: Overlay & Drawer */}
            {isOpen && (
                <div className="relative z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 transition-opacity"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <div className="fixed inset-0 flex">
                        <div className="relative mr-16 flex w-full max-w-xs flex-1">
                            <SidebarContent />
                            <button
                                className="absolute top-0 right-0 -mr-12 pt-2 text-white"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
