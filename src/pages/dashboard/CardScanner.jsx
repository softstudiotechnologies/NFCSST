import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { FiCamera, FiRefreshCw, FiSave, FiCheck } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';

const CardScanner = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scannedData, setScannedData] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        processImage(imageSrc);
    }, [webcamRef]);

    const processImage = async (image) => {
        setScanning(true);
        setProgress(0);
        try {
            const result = await Tesseract.recognize(
                image,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.floor(m.progress * 100));
                        }
                    }
                }
            );

            parseText(result.data.text);
        } catch (err) {
            console.error(err);
            toast.error('Failed to scan image');
        } finally {
            setScanning(false);
        }
    };

    const parseText = (text) => {
        // Simple heuristic extraction
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const phoneRegex = /(\+?[\d\s-]{10,})/g;

        const emailMatch = text.match(emailRegex);
        const phoneMatch = text.match(phoneRegex);

        setScannedData({
            name: lines[0] || '', // Guess first line is name
            company: lines[1] || '', // Guess second line is company
            email: emailMatch ? emailMatch[0] : '',
            phone: phoneMatch ? phoneMatch[0] : '',
            notes: text, // Save full text as notes
            originalImage: imgSrc
        });
    };

    const handleSave = async () => {
        try {
            await api.post('/leads', scannedData);
            toast.success('Lead saved successfully');
            setImgSrc(null);
            setScannedData(null);
        } catch (error) {
            toast.error('Failed to save lead');
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-white mb-6">AI Business Card Scanner</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Camera / Image Section */}
                <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
                    {!imgSrc ? (
                        <>
                            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-700">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 border-2 border-primary opacity-50 m-8 rounded border-dashed pointer-events-none"></div>
                            </div>
                            <button
                                onClick={capture}
                                className="mt-4 px-6 py-3 bg-primary text-black font-bold rounded-full flex items-center shadow-lg hover:opacity-90"
                            >
                                <FiCamera className="mr-2" /> Capture Card
                            </button>
                        </>
                    ) : (
                        <div className="w-full">
                            <img src={imgSrc} alt="Scanned" className="w-full rounded-lg border border-gray-700 mb-4" />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => { setImgSrc(null); setScannedData(null); }}
                                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 flex items-center"
                                >
                                    <FiRefreshCw className="mr-2" /> Retake
                                </button>
                                {scanning && <span className="text-primary font-bold animate-pulse">Scanning... {progress}%</span>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Section */}
                {scannedData && !scanning && (
                    <div className="bg-zinc-900 p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-4">Extracted Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={scannedData.name}
                                    onChange={e => setScannedData({ ...scannedData, name: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                                <input
                                    type="text"
                                    value={scannedData.company}
                                    onChange={e => setScannedData({ ...scannedData, company: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={scannedData.email}
                                    onChange={e => setScannedData({ ...scannedData, email: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={scannedData.phone}
                                    onChange={e => setScannedData({ ...scannedData, phone: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full py-3 bg-green-500 text-black font-bold rounded mt-4 hover:bg-green-400 transition-colors flex justify-center items-center"
                            >
                                <FiCheck className="mr-2" /> Save Lead
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardScanner;
