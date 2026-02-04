import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiCreditCard, FiPieChart, FiMenu, FiCamera } from 'react-icons/fi';

const BottomNav = ({ onMenuClick }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/dashboard', icon: FiHome },
        { name: 'Cards', path: '/cards', icon: FiCreditCard },
        { name: 'Scan', path: '/scanner', icon: FiCamera, isFab: true },
        { name: 'Analytics', path: '/analytics', icon: FiPieChart },
        { name: 'Menu', action: onMenuClick, icon: FiMenu },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-t border-gray-800 pb-safe">
            <div className="flex justify-between items-center px-2 h-16">
                {navItems.map((item) => {
                    if (item.isFab) {
                        return (
                            <div key={item.name} className="relative -top-5">
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform active:scale-95
                                        ${isActive(item.path)
                                            ? 'bg-primary text-black ring-4 ring-black'
                                            : 'bg-zinc-800 text-white ring-4 ring-black border border-gray-700'}
                                    `}
                                >
                                    <item.icon className="w-6 h-6" />
                                </button>
                            </div>
                        );
                    }

                    return (
                        <button
                            key={item.name}
                            onClick={() => item.path ? navigate(item.path) : item.action?.()}
                            className={`flex flex-col items-center justify-center w-16 space-y-1 ${isActive(item.path) ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
