import { FiMenu, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="bg-black/40 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 h-20">
            <div className="flex h-full items-center justify-between px-6 lg:px-10">
                <div className="flex items-center">
                    {/* Mobile Menu & Logo */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-gray-400 hover:text-primary transition-colors mr-4"
                    >
                        <FiMenu size={24} />
                    </button>

                    <div className="lg:hidden flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                            <span className="text-black font-black text-xs">S</span>
                        </div>
                    </div>

                    {/* Desktop Breadcrumb/Title */}
                    <div className="hidden lg:block">
                        <h1 className="text-lg font-display font-black text-white/90 uppercase tracking-widest italic">
                            Command <span className="text-primary not-italic">Center</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <button className="hidden sm:flex relative p-2 text-gray-400 hover:text-white transition-colors">
                        <FiBell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-black" />
                    </button>

                    <div className="flex items-center space-x-3 group cursor-pointer pl-6 border-l border-white/10">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-white group-hover:text-primary transition-colors">{user?.name || 'User'}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Pro Plan</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(198,255,0,0.1)] group-hover:scale-110 transition-transform">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
