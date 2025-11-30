import React from 'react';
import { User as UserIcon, Trash2, Eye, EyeOff } from 'lucide-react';

const UserItem = ({ user, onToggleWatch, onDelete }) => {
    return (
        <div className="bg-surface p-4 rounded-xl mb-3 shadow-sm border border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 text-gray-400">
                    <UserIcon size={20} />
                </div>
                <div>
                    <h3 className="font-medium text-sm text-white">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-gray-500">@{user.username || 'No username'}</p>
                    <p className="text-[10px] text-gray-600">ID: {user.telegramId}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onToggleWatch(user._id)}
                    className={`p-2 rounded-full ${user.isWatching ? 'bg-primary/10 text-primary' : 'bg-gray-700 text-gray-400'}`}
                >
                    {user.isWatching ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                    onClick={() => onDelete(user._id)}
                    className="p-2 rounded-full bg-red-500/10 text-red-500"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default UserItem;
