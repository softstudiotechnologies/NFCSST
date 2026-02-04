import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="bg-secondary shadow-sm border-b border-gray-800">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center">
                        <img src="/logo.png" alt="SST" className="h-8 w-auto mr-2" />
                        <span className="text-lg font-bold text-white tracking-tight">SoftStudio</span>
                    </div>

                    {/* Desktop Title */}
                    <h1 className="hidden lg:block text-xl font-semibold text-white">Dashboard</h1>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center space-x-3">
                        <span className="hidden sm:block text-sm font-medium text-gray-300">{user?.email}</span>
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
