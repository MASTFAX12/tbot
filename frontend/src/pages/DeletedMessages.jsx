import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageCard from '../components/MessageCard';
import { Loader2 } from 'lucide-react';

const DeletedMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get('/api/deleted-messages');
                setMessages(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-4" dir="rtl">
            <h2 className="text-xl font-bold mb-4 text-red-500">الرسائل المحذوفة</h2>
            <div className="space-y-2">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        لم يتم التقاط رسائل محذوفة.
                    </div>
                ) : (
                    messages.map(msg => (
                        <div key={msg._id} className="relative">
                            <div className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full z-10">
                                محذوفة
                            </div>
                            <MessageCard message={msg} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DeletedMessages;
