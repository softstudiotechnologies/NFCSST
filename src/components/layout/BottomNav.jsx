import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiCreditCard, FiPieChart, FiMenu, FiCamera, FiUsers } from 'react-icons/fi';

const BottomNav = ({ onMenuClick }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/dashboard', icon: FiHome },
        { name: 'Leads', path: '/leads', icon: FiUsers },
        { name: 'Scan', path: '/scanner', icon: FiCamera, isFab: true },
        { name: 'Data', path: '/analytics', icon: FiPieChart },
        { name: 'Menu', action: onMenuClick, icon: FiMenu },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-t border-white/5 pb-safe">
            <div className="flex justify-between items-center px-2 h-20">
                {navItems.map((item) => {
                    if (item.isFab) {
                        return (
                            <div key={item.name} className="relative -top-6">
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        flex items-center justify-center w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(198,255,0,0.3)] transition-transform active:scale-90
                                        ${isActive(item.path)
                                            ? 'bg-primary text-black ring-4 ring-black'
                                            : 'bg-zinc-800 text-white ring-4 ring-black border border-white/10'}
                                    `}
                                >
                                    <item.icon className="w-8 h-8" />
                                </button>
                            </div>
                        );
                    }

                    return (
                        <button
                            key={item.name}
                            onClick={() => item.path ? navigate(item.path) : item.action?.()}
                            className={`flex flex-col items-center justify-center w-16 space-y-1 transition-colors ${isActive(item.path) ? 'text-primary' : 'text-gray-500 active:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-tighter shadow-sm">{item.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
