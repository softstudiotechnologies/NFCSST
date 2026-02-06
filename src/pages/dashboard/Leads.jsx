import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    FiUser, FiMail, FiPhone, FiBriefcase,
    FiDownload, FiTrash2, FiSearch, FiFilter,
    FiCalendar, FiMessageSquare, FiExternalLink
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const { data } = await api.get('/leads');
            // Backend might not exist or be empty, handle gracefully
            setLeads(data || []);
        } catch (error) {
            console.error(error);
            // toast.error('Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this lead?')) return;
        try {
            await api.delete(`/leads/${id}`);
            setLeads(leads.filter(l => l._id !== id));
            toast.success('Lead removed');
        } catch (error) {
            toast.error('Failed to delete lead');
        }
    };

    const exportToCSV = () => {
        if (leads.length === 0) return;
        const headers = ['Name', 'Company', 'Email', 'Phone', 'Notes', 'Date'];
        const rows = leads.map(l => [
            l.name || '',
            l.company || '',
            l.email || '',
            l.phone || '',
            l.notes?.replace(/\n/g, ' ') || '',
            new Date(l.createdAt).toLocaleDateString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredLeads = leads.filter(l =>
    (l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.company?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-white tracking-tight uppercase">Captured <span className="text-primary italic">Leads</span></h2>
                    <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mt-2">Manage contacts from your AI Scanner</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center px-6 py-3 bg-zinc-900 text-white font-black rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all uppercase text-xs tracking-widest"
                    >
                        <FiDownload className="mr-2" /> Export CSV
                    </button>
                    <button
                        onClick={fetchLeads}
                        className="p-3 bg-primary text-black rounded-2xl hover:scale-105 transition-transform"
                    >
                        <FiCalendar className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Search & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 relative">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="search"
                        placeholder="Search by name, company or email..."
                        className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:border-primary/30 outline-none transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="bg-zinc-950 border border-white/5 rounded-2xl p-4 flex items-center justify-between px-6">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Leads</span>
                    <span className="text-2xl font-display font-black text-primary">{filteredLeads.length}</span>
                </div>
            </div>

            {/* Leads Table/Grid */}
            {loading ? (
                <div className="py-20 flex justify-center text-primary animate-pulse">
                    <FiActivity size={40} className="animate-spin" />
                </div>
            ) : filteredLeads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredLeads.map((lead, idx) => (
                            <motion.div
                                key={lead._id || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-zinc-950 rounded-[2rem] border border-white/5 p-6 hover:border-primary/20 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                        <FiUser size={24} />
                                    </div>
                                    <button
                                        onClick={() => handleDelete(lead._id)}
                                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xl font-display font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight truncate">{lead.name || 'Unknown Contact'}</h4>
                                        <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-tighter mt-1">
                                            <FiBriefcase className="mr-1.5" /> {lead.company || 'Personal'}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 space-y-3">
                                        {lead.email && (
                                            <div className="flex items-center text-sm font-medium text-gray-400">
                                                <FiMail className="mr-3 text-primary" /> {lead.email}
                                            </div>
                                        )}
                                        {lead.phone && (
                                            <div className="flex items-center text-sm font-medium text-gray-400">
                                                <FiPhone className="mr-3 text-primary" /> {lead.phone}
                                            </div>
                                        )}
                                    </div>

                                    {lead.notes && (
                                        <div className="mt-4 p-4 bg-zinc-900/50 rounded-xl">
                                            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">OCR Transcript</div>
                                            <p className="text-[11px] text-gray-500 line-clamp-3 italic">"{lead.notes.substring(0, 100)}..."</p>
                                        </div>
                                    )}

                                    <div className="pt-6 flex gap-2">
                                        <a href={`mailto:${lead.email}`} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-center text-xs font-black tracking-widest uppercase transition-all">Email</a>
                                        {lead.phone && <a href={`tel:${lead.phone}`} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-center text-xs font-black tracking-widest uppercase transition-all">Call</a>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="py-32 text-center bg-zinc-900/20 rounded-[3rem] border border-dashed border-white/5">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiMessageSquare className="text-3xl text-gray-700" />
                    </div>
                    <h3 className="text-xl font-display font-black text-white mb-2 uppercase tracking-tighter">No leads captured</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">Use the AI Scanner to scan business cards and they will appear here instantly.</p>
                    <a href="/scanner" className="inline-block mt-8 text-primary font-black text-xs tracking-[0.2em] uppercase hover:underline">Launch Scanner →</a>
                </div>
            )}
        </div>
    );
};

const FiActivity = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
);

export default Leads;
