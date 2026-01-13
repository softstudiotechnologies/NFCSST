import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { FiUser, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const PublicProfile = () => {
    const { slug } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get(`/profiles/p/${slug}`);
                setProfile(data);

                // Track View
                // api.post('/analytics/track', { profileId: data._id, type: 'VIEW' });
            } catch (error) {
                setError('Profile not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [slug]);

    const saveContact = () => {
        // VCard download logic would go here
        alert('Save Contact clicked');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Mobile: Full width, no shadow, no rounded corners. Desktop: Max-w-md, shadow, rounded. */}
            <div className="w-full sm:max-w-md bg-white min-h-screen sm:min-h-0 sm:h-auto sm:shadow-xl sm:rounded-3xl overflow-hidden sm:my-8">
                {/* Cover Image */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                    {profile.coverUrl && <img src={profile.coverUrl} className="w-full h-full object-cover" alt="Cover" />}
                </div>

                {/* Avatar & Header */}
                <div className={`px-6 -mt-16 text-center relative z-10 ${profile.theme?.layout === 'minimal' ? 'mt-8' : ''}`}>
                    {profile.theme?.layout !== 'minimal' && (
                        <div className="w-32 h-32 rounded-full bg-white mx-auto border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                            ) : (
                                <FiUser className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                    )}

                    <h1 className="mt-4 text-2xl font-bold text-white">{profile.displayName}</h1>
                    <p className="text-gray-600 font-medium">{profile.title}</p>
                    <p className="text-gray-500 text-sm mt-1">{profile.company}</p>

                    <button
                        onClick={saveContact}
                        style={{ backgroundColor: profile.theme?.primaryColor || '#c6ff00' }}
                        className="mt-6 w-full py-3 text-black rounded-full font-semibold shadow-lg hover:opacity-90 transition-opacity"
                    >
                        Save Contact
                    </button>
                </div>

                {/* Bio */}
                {profile.bio && (
                    <div className="px-6 mt-6 text-center text-gray-700">
                        <p>{profile.bio}</p>
                    </div>
                )}

                {/* Components List */}
                <div className="px-4 py-8 space-y-4">
                    {profile.components && profile.components.map((comp) => {
                        if (!comp.isEnabled) return null;

                        // Simple renderer based on type
                        switch (comp.type) {
                            case 'link':
                                return (
                                    <a
                                        key={comp._id}
                                        href={comp.data.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-zinc-900 rounded-xl border border-gray-800 hover:bg-zinc-800 transition-colors shadow-sm"
                                    >
                                        <div className="p-2 bg-zinc-800 rounded-full"><FiGlobe className="text-white" /></div>
                                        <span className="ml-4 font-medium text-white">{comp.data.label}</span>
                                    </a>
                                );
                            case 'social':
                                // Can be refined per network
                                return (
                                    <a
                                        key={comp._id}
                                        href={comp.data.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-4 bg-zinc-900 rounded-xl border border-gray-800 hover:bg-zinc-800 transition-colors shadow-sm"
                                    >
                                        <div className="p-2 bg-white rounded-full"><FiGlobe className="text-blue-500" /></div>
                                        <span className="ml-4 font-medium text-white">{comp.data.label}</span>
                                    </a>
                                );
                            case 'text':
                                return <div key={comp._id} className="p-4 bg-zinc-900 rounded-xl text-center text-white">{comp.data.text}</div>;
                            case 'video':
                                return (
                                    <div key={comp._id} className="rounded-xl overflow-hidden shadow-sm border border-gray-800 bg-zinc-900">
                                        <div className="relative pt-[56.25%]">
                                            {/* Simple YouTube Embed */}
                                            {comp.data.url?.includes('youtube') || comp.data.url?.includes('youtu.be') ? (
                                                <iframe
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    src={`https://www.youtube.com/embed/${comp.data.url.split('v=')[1] || comp.data.url.split('/').pop()}`}
                                                    title="Video"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
                                                    Video provider not supported
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            case 'gallery':
                                return (
                                    <div key={comp._id} className="overflow-x-auto flex space-x-4 pb-4 hide-scrollbar">
                                        {comp.data.images && comp.data.images.map((img, idx) => (
                                            <img key={idx} src={img} alt={`Gallery ${idx}`} className="h-40 rounded-lg shadow-sm border border-gray-800" />
                                        ))}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>

                <div className="pb-8 text-center">
                    <a href="/" className="text-xs text-gray-400 font-medium">Create your own NFC card</a>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
