import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PortfolioItem {
    _id?: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
}

const PortfolioManagement = () => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [newItem, setNewItem] = useState<PortfolioItem>({
        title: '',
        description: '',
        category: '',
        imageUrl: ''
    });
    const [isAdding, setIsAdding] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editFile, setEditFile] = useState<File | null>(null);

    const API_URL = 'http://localhost:7003/api/portfolio';

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (Array.isArray(data)) {
                setItems(data);
            } else {
                setItems([]);
                console.error('Data fetched is not an array:', data);
            }
        } catch (error) {
            toast.error('Failed to fetch portfolio items');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        const formData = new FormData();
        formData.append('title', newItem.title);
        formData.append('description', newItem.description);
        formData.append('category', newItem.category);
        if (selectedFile) {
            formData.append('image', selectedFile);
        } else if (newItem.imageUrl) { // Only append imageUrl if a file isn't selected and imageUrl is provided
            formData.append('imageUrl', newItem.imageUrl);
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (res.ok) {
                toast.success('Project added successfully');
                setNewItem({ title: '', description: '', category: '', imageUrl: '' });
                setSelectedFile(null);
                setIsAdding(false); // Close the add form
                fetchItems();
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('adminToken');
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to add project');
            }
        } catch (err) {
            toast.error('Failed to add project');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                toast.success('Project deleted');
                fetchItems();
            } else if (response.status === 401 || response.status === 403) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('adminToken');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to delete project');
            }
        } catch (error) {
            toast.error('Failed to delete project');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem?._id) return;
        const token = localStorage.getItem('adminToken');

        const formData = new FormData();
        formData.append('title', editingItem.title);
        formData.append('description', editingItem.description);
        formData.append('category', editingItem.category);
        if (editFile) {
            formData.append('image', editFile);
        } else if (editingItem.imageUrl) { // Only append imageUrl if a file isn't selected and imageUrl is provided
            formData.append('imageUrl', editingItem.imageUrl);
        }

        try {
            const res = await fetch(`${API_URL}/${editingItem._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (res.ok) {
                toast.success('Project updated successfully');
                setEditingItem(null);
                setEditFile(null);
                fetchItems();
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('adminToken');
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to update project');
            }
        } catch (err) {
            toast.error('Failed to update project');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold font-playfair">Portfolio Management</h1>
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-luxe-gold text-black px-6 py-2 rounded-full font-semibold hover:bg-white transition-colors"
                    >
                        <Plus size={20} /> Add New Project
                    </button>
                </div>

                {isAdding && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-luxe-dark-gray p-8 rounded-2xl border border-luxe-gold/20 w-full max-w-lg">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Add New Project</h2>
                                <button onClick={() => setIsAdding(false)}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="mb-10 bg-luxe-dark-gray/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <input
                                        type="text" placeholder="Project Title" required
                                        className="flex-1 bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                        value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                    />
                                    <input
                                        type="text" placeholder="Category" required
                                        className="w-full md:w-1/4 bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                        value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 mb-4">
                                    <textarea
                                        placeholder="Description" required
                                        className="w-full h-24 bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold resize-none"
                                        value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                    ></textarea>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text" placeholder="Image URL (Optional)"
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                            value={newItem.imageUrl} onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                                            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-luxe-gold text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
                                    Create Project
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-luxe-gold" size={48} />
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {items.map((item) => (
                            <div key={item._id} className="bg-luxe-dark-gray/50 border border-white/5 rounded-xl p-6 flex items-center gap-6">
                                <img
                                    src={item.imageUrl || `https://s0.wp.com/mshots/v1/https://${item.title}?w=200&h=200`}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://placehold.co/200x200/1a1a1a/FFF?text=${item.title}`;
                                    }}
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-luxe-gold mb-2">{item.category}</p>
                                    <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingItem(item)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-blue-400 transition-colors"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id!)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editingItem && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-luxe-dark-gray p-8 rounded-2xl border border-luxe-gold/20 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Edit Project</h2>
                            <button onClick={() => setEditingItem(null)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text" placeholder="Title" required
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                            />
                            <input
                                type="text" placeholder="Category" required
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text" placeholder="Image URL (Optional)"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                    value={editingItem.imageUrl} onChange={e => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                                    onChange={e => setEditFile(e.target.files?.[0] || null)}
                                />
                            </div>
                            <textarea
                                placeholder="Description" required rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 outline-none focus:border-luxe-gold"
                                value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                            />
                            <button type="submit" className="w-full bg-luxe-gold text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioManagement;
