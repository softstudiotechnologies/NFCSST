import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useState } from 'react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-black overflow-hidden font-sans">
            {/* Desktop Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-32 lg:pb-8">
                        <Outlet />
                    </div>
                </main>

                <BottomNav onMenuClick={() => setIsSidebarOpen(true)} />
            </div>
        </div>
    );
};

export default DashboardLayout;
