import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save, Loader2 } from 'lucide-react';

const SettingsPage = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('/api/settings');
                const settingsMap = {};
                res.data.forEach(s => settingsMap[s.key] = s.value);
                setFormData(settingsMap);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async (key) => {
        try {
            await axios.post('/api/settings', { key, value: formData[key] });
            alert('تم الحفظ!');
        } catch (err) {
            alert('خطأ في الحفظ');
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-4" dir="rtl">
            <h2 className="text-xl font-bold mb-6 text-white">الإعدادات</h2>

            <div className="space-y-6">
                <div className="bg-surface p-4 rounded-xl border border-gray-800">
                    <label className="block text-sm text-gray-400 mb-2">توكن البوت (Bot Token)</label>
                    <div className="flex gap-2">
                        <input
                            type="password"
                            value={formData['bot_token'] || ''}
                            onChange={e => handleChange('bot_token', e.target.value)}
                            className="flex-1 bg-dark p-2 rounded text-white text-sm border border-gray-700 text-left"
                            dir="ltr"
                        />
                        <button onClick={() => handleSave('bot_token')} className="bg-primary p-2 rounded text-white">
                            <Save size={18} />
                        </button>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-800">
                    <label className="block text-sm text-gray-400 mb-2">آيدي المجموعة (Group ID)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={formData['group_id'] || ''}
                            onChange={e => handleChange('group_id', e.target.value)}
                            className="flex-1 bg-dark p-2 rounded text-white text-sm border border-gray-700 text-left"
                            dir="ltr"
                        />
                        <button onClick={() => handleSave('group_id')} className="bg-primary p-2 rounded text-white">
                            <Save size={18} />
                        </button>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-800">
                    <label className="block text-sm text-gray-400 mb-2">رابط الويب هوك (Webhook URL)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={formData['webhook_url'] || ''}
                            onChange={e => handleChange('webhook_url', e.target.value)}
                            className="flex-1 bg-dark p-2 rounded text-white text-sm border border-gray-700 text-left"
                            dir="ltr"
                        />
                        <button onClick={() => handleSave('webhook_url')} className="bg-primary p-2 rounded text-white">
                            <Save size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
