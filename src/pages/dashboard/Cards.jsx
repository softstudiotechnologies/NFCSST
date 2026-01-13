import { useState, useEffect } from 'react';
import { FiCpu, FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Cards = () => {
    const [isNfcSupported, setIsNfcSupported] = useState(false);
    const [isWriting, setIsWriting] = useState(false);
    const [profileUrl, setProfileUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check Web NFC support
        if ('NDEFReader' in window) {
            setIsNfcSupported(true);
        }

        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: profiles } = await api.get('/profiles');
            if (profiles.length > 0) {
                // Construct the full public URL
                const baseUrl = window.location.origin.replace('dashboard', ''); // Simple heuristic, better to use env var
                // For dev/prod consistency, let's look at current location
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

            toast.info("Hold your NFC card near the back of your phone...");

            await ndef.write({
                records: [{ recordType: "url", data: profileUrl }]
            });

            toast.success("Success! Your card is now linked to your profile.");
        } catch (error) {
            console.error(error);
            toast.error(`Failed to write: ${error.message || 'Unknown error'}`);
        } finally {
            setIsWriting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-white mb-6">NFC Card Management</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Writer Section */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center mb-4">
                        <FiCpu className="w-8 h-8 text-primary mr-3" />
                        <h3 className="text-xl font-bold text-white">Program Your Card</h3>
                    </div>

                    <p className="text-gray-400 mb-6">
                        Write your digital profile link directly to any standard NFC tag (NTAG213, NTAG215, etc.).
                    </p>

                    <div className="bg-black p-4 rounded-lg border border-gray-700 mb-6">
                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Target URL</span>
                        <p className="text-primary font-mono truncate mt-1">{profileUrl}</p>
                    </div>

                    {isNfcSupported ? (
                        <button
                            onClick={handleWriteTag}
                            disabled={isWriting}
                            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center transition-all ${isWriting
                                ? 'bg-yellow-500 text-black animate-pulse'
                                : 'bg-primary text-black hover:opacity-90'
                                }`}
                        >
                            {isWriting ? 'Scanning... Tap your Card now' : 'Start Programming'}
                        </button>
                    ) : (
                        <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg flex items-start">
                            <FiAlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-red-500 font-bold mb-1">Browser Not Supported</h4>
                                <p className="text-red-400 text-sm">
                                    Web NFC is currently only supported on Chrome for Android. To program your card, please open this dashboard on an Android device using Chrome.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Instructions / Alternative */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center mb-4">
                        <FiHelpCircle className="w-8 h-8 text-blue-500 mr-3" />
                        <h3 className="text-xl font-bold text-white">Using iPhone or Desktop?</h3>
                    </div>

                    <p className="text-gray-400 mb-4">
                        If you cannot program the card directly from this browser, you can use a free mobile app.
                    </p>

                    <ol className="list-decimal list-inside space-y-3 text-gray-300">
                        <li>Download <strong>"NFC Tools"</strong> from App Store or Play Store.</li>
                        <li>Open the app and select <strong>"Write"</strong>.</li>
                        <li>Add a record of type <strong>"URL / URI"</strong>.</li>
                        <li>Paste your profile link: <span className="text-primary font-mono text-sm">{profileUrl}</span></li>
                        <li>Tap <strong>"Write"</strong> and hold your card to the phone.</li>
                    </ol>

                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <div className="flex items-center text-green-500">
                            <FiCheckCircle className="mr-2" />
                            <span>Your profile is active and ready to link.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
