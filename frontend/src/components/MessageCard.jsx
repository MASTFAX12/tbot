import React from 'react';
import { format } from 'date-fns';
import { FileText, Image, Video, Mic, MapPin, Music, Sticker } from 'lucide-react';

const MessageCard = ({ message }) => {
    const { senderName, type, content, caption, timestamp, rawMessage } = message;

    const renderContent = () => {
        switch (type) {
            case 'text':
                return <p className="text-sm text-gray-100 whitespace-pre-wrap">{content}</p>;
            case 'photo':
                return (
                    <div className="rounded-lg overflow-hidden my-1">
                        <div className="bg-gray-800 h-48 flex items-center justify-center text-gray-500">
                            <Image size={32} />
                            <span className="ml-2 text-xs">صورة</span>
                        </div>
                    </div>
                );
            case 'video':
                return (
                    <div className="rounded-lg overflow-hidden my-1 bg-gray-800 h-48 flex items-center justify-center text-gray-500">
                        <Video size={32} />
                        <span className="ml-2 text-xs">فيديو</span>
                    </div>
                );
            case 'voice':
                return (
                    <div className="flex items-center p-2 bg-gray-800 rounded-lg my-1">
                        <Mic size={20} className="text-primary mr-2" />
                        <span className="text-xs text-gray-400">رسالة صوتية</span>
                    </div>
                );
            case 'location':
                return (
                    <div className="flex items-center p-2 bg-gray-800 rounded-lg my-1">
                        <MapPin size={20} className="text-red-500 mr-2" />
                        <span className="text-xs text-gray-400">موقع: {JSON.stringify(content)}</span>
                    </div>
                );
            default:
                return (
                    <div className="p-2 bg-gray-800 rounded-lg my-1 text-xs text-gray-400 break-all">
                        نوع غير مدعوم: {type}
                    </div>
                );
        }
    };

    return (
        <div className="bg-surface p-3 rounded-xl mb-3 shadow-sm border border-gray-800">
            <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-primary text-sm">{senderName}</span>
                <span className="text-[10px] text-gray-500">{format(new Date(timestamp), 'HH:mm')}</span>
            </div>

            <div className="mb-1">
                {renderContent()}
            </div>

            {caption && (
                <p className="text-sm text-gray-300 mt-1">{caption}</p>
            )}
        </div>
    );
};

export default MessageCard;
