import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold font-playfair bg-gradient-to-r from-luxe-gold to-white bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <Link to="/" className="flex items-center gap-2 text-luxe-gold hover:text-white transition-colors">
                        <LogOut size={20} />
                        Exit Admin
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link
                        to="/admin/portfolio"
                        className="group p-8 rounded-2xl border border-luxe-gold/20 bg-luxe-dark-gray/50 backdrop-blur-sm hover:border-luxe-gold/50 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-full bg-luxe-gold/10 flex items-center justify-center mb-6 text-luxe-gold group-hover:scale-110 transition-transform">
                            <ImageIcon size={24} />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Portfolio Management</h2>
                        <p className="text-gray-400">View, add, edit, or delete portfolio items.</p>
                    </Link>

                    {/* Add more management modules here */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
