import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUser, FiGlobe, FiInstagram, FiLinkedin, FiMail,
    FiPhone, FiDownload, FiShare2, FiExternalLink, FiMapPin, FiBriefcase
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const PublicProfile = () => {
    const { slug } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get(`/profiles/p/${slug}`);
                setProfile(data);
                // Track View (optional logging)
                // api.post('/analytics/track', { profileId: data._id, type: 'VIEW' }).catch(() => {});
            } catch (error) {
                setError('Profile not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [slug]);

    const saveContact = () => {
        if (!profile) return;

        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${profile.displayName || ''}`,
            `ORG:${profile.company || ''}`,
            `TITLE:${profile.title || ''}`,
            `TEL;TYPE=CELL:${profile.phone || ''}`,
            `EMAIL;TYPE=INTERNET:${profile.email || ''}`,
            `NOTE:${profile.bio || ''}`,
            `URL:${window.location.href}`,
            'END:VCARD'
        ].join('\n');

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${profile.displayName || 'contact'}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Contact file generated!");
    };

    const shareProfile = () => {
        if (navigator.share) {
            navigator.share({
                title: profile.displayName,
                text: `Connect with ${profile.displayName} on Soft Studio`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            setShowQR(true);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <FiUser className="text-4xl text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Profile Not Found</h1>
            <p className="text-gray-500 mb-8">The link you followed may be broken or the profile has been removed.</p>
            <a href="/" className="px-8 py-3 bg-primary text-black font-black rounded-xl uppercase text-sm tracking-widest">Back to Home</a>
        </div>
    );

    const primaryColor = profile.theme?.primaryColor || '#c6ff00';

    return (
        <div className="min-h-screen bg-zinc-950 flex justify-center selection:bg-primary selection:text-black">
            <div className="w-full sm:max-w-[480px] bg-black min-h-screen relative overflow-hidden flex flex-col">

                {/* Background Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

                {/* Hero / Cover */}
                <div className="relative h-56 bg-zinc-900 overflow-hidden">
                    {profile.coverUrl ? (
                        <img src={profile.coverUrl} className="w-full h-full object-cover opacity-60" alt="Cover" />
                    ) : (
                        <div className="w-full h-full bg-mesh opacity-20" />
                    )}

                    {/* Top Actions */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
                        <button onClick={() => window.history.back()} className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10">
                            <FiGlobe className="w-5 h-5" />
                        </button>
                        <button onClick={shareProfile} className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10">
                            <FiShare2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="px-6 -mt-20 relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-36 h-36 rounded-[2.5rem] bg-zinc-900 p-1.5 border-4 border-black shadow-2xl overflow-hidden relative"
                    >
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} className="w-full h-full object-cover rounded-[2rem]" alt="Avatar" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-gray-500">
                                <FiUser size={48} />
                            </div>
                        )}
                    </motion.div>

                    <div className="text-center mt-6">
                        <h1 className="text-3xl font-display font-black text-white tracking-tight leading-none uppercase">{profile.displayName}</h1>
                        <div className="flex items-center justify-center mt-3 space-x-3 text-gray-400 font-bold text-xs tracking-widest uppercase">
                            {profile.title && <span className="flex items-center"><FiBriefcase className="mr-1.5 text-primary" /> {profile.title}</span>}
                            {profile.company && <span className="flex items-center"><FiGlobe className="mr-1.5 text-primary" /> {profile.company}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mt-10">
                        <button
                            onClick={saveContact}
                            className="flex items-center justify-center py-4 bg-primary text-black font-black rounded-2xl shadow-lg shadow-primary/10 hover:scale-105 transition-transform uppercase text-xs tracking-widest"
                        >
                            <FiDownload className="mr-2 w-4 h-4" /> Save Contact
                        </button>
                        <button
                            onClick={() => window.location.href = `mailto:${profile.email}`}
                            className="flex items-center justify-center py-4 bg-zinc-900 text-white font-black rounded-2xl border border-white/5 hover:scale-105 transition-transform uppercase text-xs tracking-widest"
                        >
                            <FiMail className="mr-2 w-4 h-4" /> Message
                        </button>
                    </div>
                </div>

                {/* Bio Section */}
                {profile.bio && (
                    <div className="px-8 mt-10 text-center">
                        <p className="text-gray-400 font-medium leading-relaxed italic">"{profile.bio}"</p>
                    </div>
                )}

                {/* Links / Components Section */}
                <div className="px-6 py-12 flex-1 space-y-4">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 pl-2">Social & Links</div>

                    {profile.components && profile.components.filter(c => c.isEnabled).map((comp) => (
                        <motion.div
                            key={comp._id}
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {renderComponent(comp, primaryColor)}
                        </motion.div>
                    ))}

                    {!profile.components?.length && (
                        <div className="p-8 text-center bg-zinc-900/50 rounded-3xl border border-dashed border-white/10">
                            <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">No links added yet</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-10 text-center border-t border-white/5 bg-zinc-950/50">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Powered by</p>
                    <div className="flex items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <div className="w-6 h-6 bg-primary rounded flex items-center justify-center mr-2">
                            <span className="text-black font-black text-[10px]">S</span>
                        </div>
                        <span className="text-xs font-display font-black text-white tracking-tighter uppercase leading-none">Soft Studio</span>
                    </div>
                </div>
            </div>

            {/* QR Code Overlay (Fallback for browsers without Navigator.Share) */}
            <AnimatePresence>
                {showQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setShowQR(false)}
                    >
                        <div className="bg-zinc-900 p-8 rounded-[3rem] border border-white/10 text-center max-w-sm w-full" onClick={e => e.stopPropagation()}>
                            <h3 className="text-xl font-display font-black text-white mb-6 uppercase">Scan QR Code</h3>
                            <div className="bg-white p-6 rounded-[2rem] inline-block mb-6 shadow-2xl">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}&bgcolor=ffffff&color=000000`} alt="QR Code" />
                            </div>
                            <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">Let others scan this QR code to view your digital business card.</p>
                            <button onClick={() => setShowQR(false)} className="w-full py-4 bg-primary text-black font-black rounded-2xl uppercase tracking-widest text-xs">Close</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const renderComponent = (comp, primaryColor) => {
    const baseStyle = "flex items-center justify-between p-5 bg-zinc-900/50 rounded-[1.5rem] border border-white/5 hover:border-primary/20 transition-all group overflow-hidden relative";

    switch (comp.type) {
        case 'link':
        case 'social':
            return (
                <a href={comp.data.url} target="_blank" rel="noopener noreferrer" className={baseStyle}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center relative z-10">
                        <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-primary group-hover:text-black transition-colors">
                            {getIcon(comp.data.label)}
                        </div>
                        <div className="ml-4">
                            <span className="block font-black text-white text-sm uppercase tracking-tight">{comp.data.label || 'Link'}</span>
                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-400">{comp.data.url?.replace(/^https?:\/\//, '')}</span>
                        </div>
                    </div>
                    <FiExternalLink className="text-gray-700 group-hover:text-primary transition-colors relative z-10" />
                </a>
            );
        case 'text':
            return (
                <div className="p-6 bg-zinc-900/30 rounded-[1.5rem] border border-white/5 border-dashed">
                    <p className="text-sm text-gray-400 font-medium text-center leading-relaxed italic">{comp.data.text}</p>
                </div>
            );
        case 'video':
            return (
                <div className="rounded-[1.5rem] overflow-hidden border border-white/5 bg-zinc-900 group">
                    <div className="relative pt-[56.25%] overflow-hidden">
                        {comp.data.url?.includes('youtube') || comp.data.url?.includes('youtu.be') ? (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full scale-[1.01]"
                                src={`https://www.youtube.com/embed/${comp.data.url.split('v=')[1] || comp.data.url.split('/').pop()}`}
                                title="Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">Video not supported</div>
                        )}
                    </div>
                </div>
            );
        case 'gallery':
            return (
                <div className="overflow-x-auto flex space-x-4 pb-2 hide-scrollbar">
                    {comp.data.images && comp.data.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`Gallery ${idx}`} className="h-56 min-w-[200px] object-cover rounded-[1.5rem] border border-white/10 shadow-xl" />
                    ))}
                </div>
            );
        default:
            return null;
    }
};

const getIcon = (label = '') => {
    const l = label.toLowerCase();
    if (l.includes('insta')) return <FiInstagram />;
    if (l.includes('link')) return <FiLinkedin />;
    if (l.includes('face')) return <FiGlobe />; // FiFacebook not in bundle sometimes
    if (l.includes('mail')) return <FiMail />;
    if (l.includes('call') || l.includes('phone')) return <FiPhone />;
    if (l.includes('location') || l.includes('address')) return <FiMapPin />;
    return <FiGlobe />;
};

export default PublicProfile;
