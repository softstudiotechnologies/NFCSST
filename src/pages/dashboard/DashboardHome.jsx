import { Link } from 'react-router-dom';
import { FiUser, FiPieChart, FiCreditCard, FiCamera, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
    const { user } = useAuth();

    const stats = [
        { name: 'Profile Views', value: '1,203', change: '+12%', changeType: 'increase' },
        { name: 'Link Clicks', value: '432', change: '+5.4%', changeType: 'increase' }, // Placeholder data
    ];

    const quickActions = [
        {
            title: 'Edit Profile',
            description: 'Update your bio, links, and appearance.',
            icon: FiUser,
            href: '/profile/edit',
            color: 'bg-blue-500'
        },
        {
            title: 'Analytics',
            description: 'See who is visiting your profile.',
            icon: FiPieChart,
            href: '/analytics',
            color: 'bg-green-500'
        },
        {
            title: 'Manage Cards',
            description: 'Link NFC tags to your profile.',
            icon: FiCreditCard,
            href: '/cards',
            color: 'bg-purple-500'
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-zinc-900 to-black p-6 rounded-2xl border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name || 'Creator'}! 👋</h2>
                <p className="text-gray-400">Here's what's happening with your digital identity today.</p>
            </div>

            {/* Quick Actions Grid */}
            <h3 className="text-lg font-medium text-white px-1">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickActions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.href}
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-800 bg-zinc-900 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary hover:bg-zinc-800 transition-colors"
                    >
                        <div className={`flex-shrink-0 rounded-lg p-3 ${action.color} bg-opacity-20`}>
                            <action.icon className={`h-6 w-6 text-white`} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-white">{action.title}</p>
                            <p className="truncate text-sm text-gray-400">{action.description}</p>
                        </div>
                        <FiArrowRight className="h-5 w-5 text-gray-500" />
                    </Link>
                ))}
            </div>

            {/* Promo / Banner */}
            <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-10 shadow-xl sm:px-12 sm:py-16">
                <div className="absolute inset-0 bg-black bg-opacity-10 mix-blend-multiply" />
                <div className="relative">
                    <h3 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">Get the Card Scanner App</h3>
                    <p className="mt-2 max-w-xl text-lg text-black/80">
                        Scan physical business cards instantly and save them as leads directly in your dashboard.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/scanner"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 sm:px-8"
                        >
                            Try Scanner
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
