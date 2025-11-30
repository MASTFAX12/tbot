import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import MessageCard from '../components/MessageCard';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Fetch initial messages
        const fetchMessages = async () => {
            try {
                const res = await axios.get('/api/messages');
                setMessages(res.data.messages.reverse()); // Show newest at bottom
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchMessages();

        // Socket.io connection
        // Socket.io connection
        const socketUrl = import.meta.env.VITE_API_URL || undefined;
        const socket = io(socketUrl); // Connects to backend URL in prod, or relative in dev

        socket.on('new_message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="p-4" dir="rtl">
            <h2 className="text-xl font-bold mb-4 text-white">البث المباشر</h2>
            <div className="space-y-2">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        لا توجد رسائل حتى الآن.
                    </div>
                ) : (
                    messages.map(msg => (
                        <MessageCard key={msg._id || msg.messageId} message={msg} />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default Dashboard;
