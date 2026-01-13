import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(email, password, phone);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                type="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-white bg-zinc-900 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                className="relative block w-full border-0 py-1.5 text-white bg-zinc-900 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Phone (Optional)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 text-white bg-zinc-900 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-black hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/login" className="text-sm text-primary hover:text-secondary">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
