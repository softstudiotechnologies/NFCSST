import { Link, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiUser,
    FiCreditCard,
    FiPieChart,
    FiSettings,
    FiLogOut,
    FiCamera,
    FiChevronRight
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { logout, user } = useAuth();

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
        <div className="flex h-full flex-col bg-zinc-950 border-r border-white/5 text-white w-full">
            <div className="flex h-24 shrink-0 items-center px-8">
                <div className="flex items-center group cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(198,255,0,0.2)]">
                        <span className="text-black font-black text-sm uppercase">S</span>
                    </div>
                    <span className="text-sm font-display font-black tracking-tighter uppercase whitespace-nowrap">
                        Soft Studio <span className="text-primary font-bold">Tech</span>
                    </span>
                </div>
            </div>

            <nav className="flex flex-1 flex-col px-4 py-4 space-y-2">
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-4 mb-2">Main Menu</div>
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${isActive(item.href)
                            ? 'bg-primary text-black shadow-[0_10px_20px_rgba(198,255,0,0.15)] scale-[1.02]'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <div className="flex items-center">
                            <item.icon
                                className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive(item.href) ? 'text-black' : 'text-gray-500 group-hover:text-white'
                                    }`}
                                aria-hidden="true"
                            />
                            {item.name}
                        </div>
                        {isActive(item.href) ? (
                            <FiChevronRight className="h-4 w-4" />
                        ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4">
                <div className="bg-zinc-900/50 rounded-2xl p-4 border border-white/5 mb-4 group cursor-pointer hover:bg-zinc-900 transition-colors">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-black font-black">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-black text-white truncate">{user?.name || 'User Profile'}</p>
                            <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="group flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                    <FiLogOut className="mr-3 h-4 w-4" />
                    Sign out
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="hidden lg:flex lg:flex-shrink-0 w-72">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="relative z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    />

                    <div className="fixed inset-0 flex">
                        <div className="relative flex w-full max-w-xs flex-1 animate-in slide-in-from-left duration-300">
                            <SidebarContent />
                            <button
                                className="absolute top-4 right-[-50px] text-white p-2"
                                onClick={onClose}
                            >
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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
