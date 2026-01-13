import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiEye, FiMousePointer, FiShare2, FiHardDrive, FiMessageCircle, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import AnalyticsChart from '../../components/analytics/AnalyticsChart';

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-zinc-900 overflow-hidden rounded-lg shadow border border-gray-800">
        <div className="p-5">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="truncate text-sm font-medium text-gray-400">{title}</dt>
                        <dd>
                            <div className="text-lg font-medium text-white">{value}</div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
);

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Get user's first profile ID
            const { data: profiles } = await api.get('/profiles');
            if (profiles.length > 0) {
                const profileId = profiles[0]._id;
                const { data } = await api.get(`/analytics/${profileId}`);
                // Handle new backend structure which returns { totals, timeSeries, platforms }
                // For backward compatibility, check if raw data is still the old format
                if (data.totals) {
                    setStats(data);
                } else {
                    setStats({ totals: data, timeSeries: [], platforms: [] });
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading analytics...</div>;
    if (!stats) return <div>No analytics data available (Create a profile first)</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Performance Overview
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard
                    title="Total Views"
                    value={stats.totals?.VIEW || stats.VIEW || 0}
                    icon={FiEye}
                    color="text-blue-500"
                />
                <AnalyticsCard
                    title="Link Clicks"
                    value={stats.totals?.CLICK || stats.CLICK || 0}
                    icon={FiMousePointer}
                    color="text-green-500"
                />
                <AnalyticsCard
                    title="CTR (Click Rate)"
                    value={`${((stats.totals?.CLICK || stats.CLICK || 0) / (stats.totals?.VIEW || stats.VIEW || 1) * 100).toFixed(1)}%`}
                    icon={FiHardDrive}
                    color="text-purple-500"
                />
                <AnalyticsCard
                    title="New Contacts"
                    value={stats.totals?.SAVE_CONTACT || stats.SAVE_CONTACT || 0}
                    icon={FiShare2}
                    color="text-orange-500"
                />
            </div>

            <div className="bg-zinc-900 shadow rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-medium leading-6 text-white">Engagement Trends</h3>
                <div className="mt-5 h-64 bg-black border border-gray-800 rounded p-2">
                    <AnalyticsChart data={stats.timeSeries || []} />
                </div>
            </div>

            {/* Apps Overview */}
            {stats.platforms && stats.platforms.length > 0 && (
                <div className="bg-zinc-900 shadow rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-medium leading-6 text-white mb-4">Apps Overview</h3>
                    <div className="space-y-4">
                        {stats.platforms.map((platform) => (
                            <div key={platform.name} className="flex items-center justify-between">
                                <div className="flex items-center text-gray-300 capitalize">
                                    {/* Icon Mapping Placeholder */}
                                    <span className="bg-gray-800 p-2 rounded-full mr-3 text-sm">
                                        {platform.name.substring(0, 2)}
                                    </span>
                                    {platform.name}
                                </div>
                                <div className="text-white font-bold">{platform.count} Taps</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;
