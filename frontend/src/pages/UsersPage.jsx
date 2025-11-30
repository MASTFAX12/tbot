import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from '../components/UserItem';
import { Plus, Loader2 } from 'lucide-react';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({ telegramId: '', firstName: '', username: '' });

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users');
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleWatch = async (id) => {
        try {
            await axios.put(`/api/users/${id}/toggle`);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد؟')) {
            try {
                await axios.delete(`/api/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users', newUser);
            setShowAddModal(false);
            setNewUser({ telegramId: '', firstName: '', username: '' });
            fetchUsers();
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || err.message || 'خطأ غير معروف';
            alert(`خطأ في إضافة المستخدم: ${msg}`);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-4" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">الأعضاء المراقبون</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
                >
                    <Plus size={24} />
                </button>
            </div>

            <div className="space-y-2">
                {users.map(user => (
                    <UserItem
                        key={user._id}
                        user={user}
                        onToggleWatch={handleToggleWatch}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-surface p-6 rounded-2xl w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4 text-right">إضافة عضو للمراقبة</h3>
                        <form onSubmit={handleAddUser}>
                            <div className="space-y-3">
                                <input
                                    type="number"
                                    placeholder="آيدي تليجرام (مطلوب)"
                                    className="w-full bg-dark p-3 rounded-lg text-white border border-gray-700 focus:border-primary outline-none text-right"
                                    value={newUser.telegramId}
                                    onChange={e => setNewUser({ ...newUser, telegramId: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="الاسم الأول"
                                    className="w-full bg-dark p-3 rounded-lg text-white border border-gray-700 focus:border-primary outline-none text-right"
                                    value={newUser.firstName}
                                    onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="المعرف (اختياري)"
                                    className="w-full bg-dark p-3 rounded-lg text-white border border-gray-700 focus:border-primary outline-none text-right"
                                    value={newUser.username}
                                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 p-3 rounded-lg bg-gray-700 text-white font-medium"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 p-3 rounded-lg bg-primary text-white font-bold"
                                >
                                    إضافة
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
