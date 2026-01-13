import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Ensure path is correct
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user on startup
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data);
                } catch (error) {
                    console.error('Failed to load user', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    // Login
    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            setUser(data); // data contains user info fields directly or inside user object? 
            // API returns: { _id, email, role, token } -> It is the user object + token.

            toast.success('Logged in successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    // Register
    const register = async (email, password, phone) => {
        try {
            const { data } = await api.post('/auth/register', { email, password, phone });
            localStorage.setItem('token', data.token);
            setUser(data);
            toast.success('Registration successful');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
