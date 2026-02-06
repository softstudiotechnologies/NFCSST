import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCpu, FiLayout, FiPieChart, FiSmartphone, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-mesh opacity-40" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 px-6 py-8 backdrop-blur-md bg-black/20 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center group cursor-pointer">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 shadow-[0_0_20px_rgba(198,255,0,0.3)] group-hover:rotate-12 transition-transform">
                            <span className="text-black font-black text-xl">S</span>
                        </div>
                        <span className="text-xl font-display font-black tracking-tighter uppercase whitespace-nowrap">
                            Soft Studio <span className="text-primary">Technologies</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Process</a>
                        <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
                        <Link to="/register" className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-primary transition-all active:scale-95 shadow-lg shadow-white/5">
                            Get Started
                        </Link>
                    </div>

                    <button className="md:hidden text-white">
                        <FiLayout size={24} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-44 pb-20 lg:pt-56 lg:pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Next Gen Digital Identity</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl lg:text-8xl font-display font-black tracking-tight leading-[0.9] mb-8"
                        >
                            TAP INTO THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white">
                                FUTURE
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Bridge the gap between physical connections and digital presence. The ultimate SaaS platform for paperless networking using NFC and QR codes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link to="/register" className="group relative px-10 py-5 bg-primary text-black font-black text-lg rounded-2xl overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-[0_0_40px_rgba(198,255,0,0.2)]">
                                <span className="relative z-10">CREATE YOUR CARD</span>
                                <FiArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                            </Link>
                            <Link to="/login" className="px-10 py-5 bg-zinc-900 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 backdrop-blur-xl">
                                VIEW DEMO
                            </Link>
                        </motion.div>
                    </div>

                    {/* Floating Visual Elements */}
                    <div className="relative mt-20 lg:mt-32 h-[400px] lg:h-[600px] w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl"
                        >
                            <div className="relative aspect-video rounded-[3rem] bg-zinc-900/40 border border-white/10 p-4 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                                <div className="relative w-full h-full rounded-[2rem] bg-black/40 border border-white/5 p-8 flex flex-col justify-between overflow-hidden">
                                    <div className="flex justify-between items-start">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="w-12 h-12 bg-primary/20 rounded-full blur-xl" />
                                    </div>
                                    <div className="bg-zinc-800/50 w-full h-40 rounded-2xl border border-white/5 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />
                                        <div className="p-6">
                                            <div className="w-32 h-4 bg-primary/20 rounded-full mb-4" />
                                            <div className="w-64 h-2 bg-white/10 rounded-full mb-2" />
                                            <div className="w-48 h-2 bg-white/5 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Orbiting Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-[15%] w-48 h-64 bg-zinc-900/80 border border-primary/20 rounded-3xl p-6 backdrop-blur-sm hidden lg:block z-20"
                        >
                            <div className="w-full h-full border border-white/5 rounded-2xl p-4 flex flex-col justify-end">
                                <div className="w-12 h-12 bg-primary rounded-full mb-4 flex items-center justify-center">
                                    <FiSmartphone className="text-black text-xl" />
                                </div>
                                <div className="text-white font-black text-lg">SCANNER</div>
                                <div className="text-primary text-[10px] font-bold tracking-widest mt-1">ACTIVE</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-10 left-[15%] w-60 h-40 bg-zinc-900/80 border border-primary/20 rounded-3xl p-6 backdrop-blur-sm hidden lg:block z-20"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                                    <FiPieChart className="text-primary text-xl" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Analytics</div>
                                    <div className="text-xs text-gray-500">Live Views</div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-end space-x-1 h-12">
                                <div className="flex-1 bg-primary/20 rounded-t-sm h-[40%]" />
                                <div className="flex-1 bg-primary/40 rounded-t-sm h-[70%]" />
                                <div className="flex-1 bg-primary rounded-t-sm h-[100%]" />
                                <div className="flex-1 bg-primary/60 rounded-t-sm h-[60%]" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-sm font-black text-primary tracking-[0.3em] uppercase mb-4">Features</h2>
                            <h3 className="text-4xl lg:text-6xl font-display font-black tracking-tight leading-tight">
                                BUILT FOR THE <br /> MODERN NETWORKER
                            </h3>
                        </div>
                        <p className="text-gray-400 max-w-md pb-2 leading-relaxed">
                            Our platform provides a seamless experience for creating, managing, and sharing your professional identity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FeatureCard
                            icon={FiCpu}
                            title="NFC Integration"
                            desc="One-tap connection between physical cards and digital profiles."
                            color="primary"
                        />
                        <FeatureCard
                            icon={FiLayout}
                            title="Pro Designer"
                            desc="Customizable themes, visual layouts, and dynamic content blocks."
                            color="white"
                        />
                        <FeatureCard
                            icon={FiPieChart}
                            title="Insightful Data"
                            desc="Real-time analytics on profile views, click rates and leads."
                            color="primary"
                        />
                        <FeatureCard
                            icon={FiSmartphone}
                            title="AI Scanner"
                            desc="Turn any physical business card into a digital lead instantly."
                            color="white"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="max-w-3xl mx-auto text-center relative">
                    <h2 className="text-5xl lg:text-7xl font-display font-black mb-10 tracking-tight leading-none">
                        START YOUR <br /> DIGITAL JOURNEY
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg">
                        Join thousands of professionals worldwide who have switched to a smarter way of networking.
                    </p>
                    <Link to="/register" className="inline-block px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:bg-primary transition-all active:scale-95 shadow-xl shadow-white/5">
                        GET STARTED FOR FREE
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-10">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <span className="text-black font-black text-sm">S</span>
                        </div>
                        <span className="text-lg font-display font-black tracking-tighter uppercase whitespace-nowrap">
                            Soft Studio Tech
                        </span>
                    </div>

                    <div className="flex space-x-12">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">Twitter</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">LinkedIn</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">Contact</a>
                    </div>

                    <p className="text-gray-600 text-xs tracking-widest uppercase font-bold">
                        &copy; 2026 Soft Studio Technologies. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div className={`p-8 bg-zinc-950 border border-white/5 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${color === 'primary' ? 'bg-primary text-black' : 'bg-zinc-900 text-white group-hover:bg-primary group-hover:text-black shadow-lg shadow-black/20'}`}>
            <Icon className="text-2xl" />
        </div>
        <h3 className="text-2xl font-display font-black mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>

        {/* Hover Decoration */}
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <FiCheckCircle className="text-primary text-xl" />
        </div>
    </div>
);

export default LandingPage;
