import { Link } from 'react-router-dom';
import { FiUser, FiPieChart, FiCreditCard, FiArrowRight, FiZap, FiActivity, FiGlobe } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const DashboardHome = () => {
    const { user } = useAuth();

    const quickActions = [
        {
            title: 'Edit Profile',
            description: 'Update bio & links.',
            icon: FiUser,
            href: '/profile/edit',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'Analytics',
            description: 'Traffic insights.',
            icon: FiPieChart,
            href: '/analytics',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'NFC Cards',
            description: 'Link your tags.',
            icon: FiCreditCard,
            href: '/cards',
            color: 'from-amber-500 to-orange-600'
        },
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-zinc-950 p-8 lg:p-12 rounded-[2.5rem] border border-white/5">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-mesh opacity-30 pointer-events-none" />
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3 mb-6"
                    >
                        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-primary/20">
                            Active Session
                        </div>
                    </motion.div>
                    <h2 className="text-4xl lg:text-6xl font-display font-black text-white mb-4 tracking-tight">
                        HELLO, <span className="text-primary italic">{user?.name?.split(' ')[0] || 'CREATOR'}</span>!
                    </h2>
                    <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                        Your digital identity is performing well. You've had a <span className="text-white font-bold">+12% increase</span> in traffic this week.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link to="/profile/edit" className="bg-white text-black px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-primary transition-all active:scale-95 flex items-center">
                            GO TO LIVE PROFILE <FiGlobe className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Views" value="2,401" change="+8.2%" icon={FiActivity} />
                <StatCard label="Active Links" value="12" change="Stable" icon={FiZap} />
                <StatCard label="Leads Generated" value="84" change="+24%" icon={FiUser} />
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] px-2">Quick Commands</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quickActions.map((action, idx) => (
                        <Link
                            key={action.title}
                            to={action.href}
                            className="group relative flex items-center p-6 rounded-[2rem] bg-zinc-950 border border-white/5 hover:border-primary/20 transition-all duration-300"
                        >
                            <div className={`flex-shrink-0 rounded-2xl p-4 bg-zinc-900 group-hover:bg-primary transition-colors duration-300`}>
                                <action.icon className="h-6 w-6 text-white group-hover:text-black transition-colors" />
                            </div>
                            <div className="ml-5">
                                <p className="text-lg font-display font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{action.title}</p>
                                <p className="text-xs text-gray-500 font-bold group-hover:text-gray-300">{action.description}</p>
                            </div>
                            <FiArrowRight className="absolute right-8 h-5 w-5 text-gray-700 group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Promo Banner */}
            <div className="relative group overflow-hidden rounded-[3rem] bg-zinc-950 p-10 lg:p-16 border border-white/5">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center lg:text-left">
                        <h3 className="text-3xl lg:text-5xl font-display font-black leading-none mb-6">
                            SCAN PHYSICAL CARDS <br /> <span className="text-primary italic">INSTANTLY</span>
                        </h3>
                        <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8">
                            Use our AI-powered scanner to digitize paper business cards and add them to your lead list with zero effort.
                        </p>
                        <Link
                            to="/scanner"
                            className="inline-flex items-center px-10 py-4 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
                        >
                            OPEN SCANNER
                        </Link>
                    </div>

                    <div className="relative w-full max-w-sm aspect-square bg-zinc-900 rounded-[3rem] border border-white/10 p-6 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-700">
                        <div className="w-full h-full bg-black rounded-[2rem] border border-white/5 flex items-center justify-center">
                            <FiZap className="text-6xl text-primary animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, change, icon: Icon }) => (
    <div className="bg-zinc-950 p-8 rounded-[2rem] border border-white/5 group hover:border-primary/20 transition-colors">
        <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Icon className="text-xl text-gray-400 group-hover:text-black" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${change.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-400'}`}>
                {change}
            </span>
        </div>
        <div className="text-4xl font-display font-black text-white group-hover:text-primary transition-colors mb-1">{value}</div>
        <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{label}</div>
    </div>
);

export default DashboardHome;
