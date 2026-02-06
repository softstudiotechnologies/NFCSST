import { useState, useEffect } from 'react';
import { FiCpu, FiAlertCircle, FiCheckCircle, FiHelpCircle, FiSmartphone, FiCopy, FiZap, FiLayout } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Cards = () => {
    const [isNfcSupported, setIsNfcSupported] = useState(false);
    const [isWriting, setIsWriting] = useState(false);
    const [profileUrl, setProfileUrl] = useState('');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ('NDEFReader' in window) {
            setIsNfcSupported(true);
        }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: profiles } = await api.get('/profiles');
            if (profiles.length > 0) {
                setProfile(profiles[0]);
                const origin = window.location.origin;
                setProfileUrl(`${origin}/p/${profiles[0].slug}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleWriteTag = async () => {
        if (!isNfcSupported) return;
        try {
            setIsWriting(true);
            const ndef = new window.NDEFReader();
            toast.info("Hold your NFC card near your device...");
            await ndef.write({
                records: [{ recordType: "url", data: profileUrl }]
            });
            toast.success("Success! Card linked to profile.");
        } catch (error) {
            toast.error(`Write failed: ${error.message}`);
        } finally {
            setIsWriting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        toast.success("Link copied!");
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div>
                <h2 className="text-4xl font-display font-black text-white tracking-tight uppercase">Program <span className="text-primary italic">NFC Tags</span></h2>
                <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mt-2">Connect physical cards to your digital identity</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Card Preview */}
                <div className="space-y-6">
                    <div className="relative group perspective-1000">
                        <motion.div
                            initial={{ rotateY: -10 }}
                            animate={{ rotateY: 5 }}
                            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                            className="bg-zinc-950 aspect-[1.58/1] rounded-[2rem] border border-white/10 p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute top-10 right-10 opacity-20"><FiZap size={40} className="text-primary" /></div>

                            <div className="space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center p-3 border border-white/5 shadow-inner">
                                    <div className="w-full h-full bg-primary rounded-lg flex items-center justify-center">
                                        <span className="text-black font-black text-xs">S</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight">{profile?.displayName || 'User Profile'}</h4>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{profile?.title || 'Digital Identity Card'}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="bg-zinc-900 border border-white/10 p-4 rounded-2xl flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-primary rounded-sm opacity-50" />
                                    <div className="w-4 h-4 bg-primary rounded-sm opacity-30" />
                                    <div className="w-4 h-4 bg-primary rounded-sm opacity-10" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">Powered by</p>
                                    <p className="text-xs font-display font-black text-white tracking-tighter uppercase leading-none mt-1">Soft Studio</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="bg-zinc-950 p-6 rounded-[2rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all" onClick={copyToClipboard}>
                        <div className="overflow-hidden">
                            <span className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Live Profile Link</span>
                            <p className="text-primary font-bold text-sm truncate">{profileUrl}</p>
                        </div>
                        <div className="p-3 bg-zinc-900 rounded-xl group-hover:bg-primary group-hover:text-black transition-colors">
                            <FiCopy size={20} />
                        </div>
                    </div>
                </div>

                {/* Right: Programming Actions */}
                <div className="space-y-6">
                    <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl" />

                        <div className="flex items-center mb-6">
                            <div className="p-4 bg-primary/10 rounded-2xl text-primary mr-4 border border-primary/20">
                                <FiCpu size={32} />
                            </div>
                            <h3 className="text-2xl font-display font-black text-white uppercase">One-Tap Writer</h3>
                        </div>

                        <p className="text-gray-400 font-medium leading-relaxed mb-10">
                            Transfer your digital DNA to any NFC-compatible tag. We support NTAG21x, MIFARE, and most standard smart identifiers.
                        </p>

                        {isNfcSupported ? (
                            <button
                                onClick={handleWriteTag}
                                disabled={isWriting}
                                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${isWriting
                                    ? 'bg-amber-500 text-black animate-pulse'
                                    : 'bg-primary text-black hover:bg-primary-light shadow-primary/10'
                                    }`}
                            >
                                {isWriting ? 'Holding Connection... TAP CARD' : 'START PROGRAMMING'}
                            </button>
                        ) : (
                            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-start">
                                <FiAlertCircle size={24} className="text-red-500 mr-4 flex-shrink-0" />
                                <div>
                                    <h4 className="text-red-500 font-black text-sm uppercase mb-1">Web NFC Unavailable</h4>
                                    <p className="text-gray-500 text-xs font-medium leading-relaxed">
                                        Native programming requires Chrome on Android. Use our mobile app link below for support on other platforms.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* QR Alternative */}
                    <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-white/5 text-center">
                        <h4 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] mb-8">QR Alternative</h4>
                        <div className="bg-white p-6 rounded-[2.5rem] inline-block mb-8 shadow-2xl">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(profileUrl)}&margin=10&bgcolor=ffffff&color=000000`}
                                alt="QR Code"
                                className="w-32 h-32 lg:w-40 lg:h-40"
                            />
                        </div>
                        <p className="text-gray-500 text-xs font-medium max-w-xs mx-auto mb-6 leading-relaxed">
                            No NFC tag? Download this QR code to print on paper cards or use as a digital backdrop.
                        </p>
                        <a
                            download="qr-code.png"
                            href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}`}
                            className="bg-zinc-900 border border-white/10 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all inline-block"
                        >
                            Download QR
                        </a>
                    </div>
                </div>
            </div>

            {/* Guide Section */}
            <div className="bg-zinc-950 rounded-[3rem] border border-white/5 p-10 lg:p-16">
                <div className="max-w-4xl">
                    <h3 className="text-xl lg:text-3xl font-display font-black text-white uppercase mb-8 italic">Manual Setup <span className="text-primary not-italic">Workflow</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <Step number="01" title="App Install" desc="Download 'NFC Tools' on any mobile device from the App/Play stores." />
                        <Step number="02" title="Add Record" desc="Select 'Write' -> 'Add Record' -> 'URL/URI' inside the application." />
                        <Step number="03" title="Scan & Finish" desc="Paste your URL and tap the physical card to the back of your phone." />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Step = ({ number, title, desc }) => (
    <div className="space-y-4">
        <div className="text-4xl font-display font-black text-primary/20 leading-none">{number}</div>
        <h5 className="text-white font-black uppercase text-sm tracking-widest">{title}</h5>
        <p className="text-gray-500 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
);

export default Cards;
