import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCpu, FiLayout, FiPieChart, FiSmartphone } from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
            {/* Navbar */}
            <nav className="absolute top-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Soft Studio" className="h-10 w-auto mr-3" />
                    <span className="text-xl font-bold tracking-tighter">SOFT STUDIO</span>
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Log In</Link>
                    <Link to="/register" className="bg-primary text-black px-5 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                            The Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                                Digital Identity
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                            Share who you are with a single tap. Connect your physical NFC card to a stunning, customizable digital profile.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="px-8 py-4 bg-primary text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(198,255,0,0.4)] hover:shadow-[0_0_30px_rgba(198,255,0,0.6)] transition-all text-center">
                                Create Your Card
                            </Link>
                            <Link to="/login" className="px-8 py-4 border border-gray-700 text-white font-bold text-lg rounded-full hover:bg-gray-900 transition-colors text-center">
                                Login to Dashboard
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 blur-[100px] rounded-full mx-auto"></div>
                        <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500">
                            {/* Mock Profile Card */}
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                                <div>
                                    <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
                                    <div className="h-3 w-24 bg-gray-800 rounded"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="h-24 bg-black rounded-xl border border-gray-700 flex items-center justify-center">
                                    <FiLayout className="text-gray-600 text-2xl" />
                                </div>
                                <div className="h-24 bg-black rounded-xl border border-gray-700 flex items-center justify-center">
                                    <FiPieChart className="text-gray-600 text-2xl" />
                                </div>
                            </div>
                            <div className="h-12 w-full bg-primary rounded-lg"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">One Platform, Infinite Possibilities</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to manage your professional identity in the modern world.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={FiCpu}
                            title="NFC Technology"
                            desc="Write your profile link to any NFC tag instantly using your phone."
                        />
                        <FeatureCard
                            icon={FiLayout}
                            title="Custom Profiles"
                            desc="Design themes, change layouts, and add rich media like video and galleries."
                        />
                        <FeatureCard
                            icon={FiPieChart}
                            title="Advanced Analytics"
                            desc="Track views, clicks, and engagement with detailed charts."
                        />
                        <FeatureCard
                            icon={FiSmartphone}
                            title="AI Scanner"
                            desc="Scan physical business cards and save them as digital leads."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="p-6 bg-black border border-gray-800 rounded-2xl hover:border-primary/50 transition-colors group">
        <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
            <Icon className="text-2xl text-white group-hover:text-black" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
