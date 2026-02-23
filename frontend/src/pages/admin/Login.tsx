import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:7003/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                toast.success('Login successful');
                navigate('/admin');
            } else {
                toast.error(data.message || 'Invalid credentials');
            }
        } catch (error) {
            toast.error('Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-luxe-dark-gray p-8 rounded-2xl border border-luxe-gold/20 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-playfair bg-gradient-to-r from-luxe-gold to-white bg-clip-text text-transparent">
                        Admin Login
                    </h1>
                    <p className="text-gray-400 mt-2">Enter your credentials to access the panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-luxe-gold transition-colors"
                                placeholder="Admin username"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-luxe-gold transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-luxe-gold text-black font-bold py-3 rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <button
                    onClick={() => navigate('/')}
                    className="w-full mt-6 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    <ArrowLeft size={16} /> Back to Portfolio
                </button>
            </div>
        </div>
    );
};

export default Login;
