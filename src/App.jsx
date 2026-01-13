import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfileEdit from './pages/profile/ProfileEdit';
import DashboardLayout from './components/layout/DashboardLayout';
import PublicProfile from './pages/public/PublicProfile';
import Analytics from './pages/dashboard/Analytics';
import CardScanner from './pages/dashboard/CardScanner';
import Cards from './pages/dashboard/Cards';
import DashboardHome from './pages/dashboard/DashboardHome';
import LandingPage from './pages/public/LandingPage';

// Placeholder Pages




// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Public Profile Route */}
                    <Route path="/p/:slug" element={<PublicProfile />} />

                    {/* Protected Dashboard Routes */}
                    <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="profile/edit" element={<ProfileEdit />} />
                        <Route path="cards" element={<Cards />} />
                        <Route path="scanner" element={<CardScanner />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="settings" element={<div>Settings</div>} />
                    </Route>
                </Routes>
                <ToastContainer position="bottom-right" />
            </Router>
        </AuthProvider>
    );
}

export default App;
