import React, { useState, useEffect } from 'react';
// The 'react-icons' library is not a built-in dependency.
// To use the RxCross2 icon, you must install it first: npm install react-icons
// For now, we will use a text-based close button to avoid compilation errors.
// import { RxCross2 } from "react-icons/rx";

import {MdError,MdDelete} from 'react-icons/md'



const NotificationMessage = ({ message, type = 'success', duration = 2000, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(!!message);

    const typeStyles = {
        success: { bgColor: 'bg-green-500', icon: '✔' },
        error: { bgColor: 'bg-red-500', icon: <MdError /> },
        warning: { bgColor: 'bg-yellow-500', icon: '⚠️' },
        delete: { bgColor: 'bg-red-700', icon: <MdDelete /> },
        update: { bgColor: 'bg-blue-700', icon: '📝' },
    };

    const { bgColor, icon } = typeStyles[type] || typeStyles.success;

    useEffect(() => {
        setIsVisible(!!message);

        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onDismiss) {
                onDismiss();
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onDismiss]);

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    if (!message || !isVisible) {
        return null;
    }

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg text-white shadow-xl flex items-center justify-between z-50 transition-all transform duration-300 ease-out ${bgColor}`}>
            <div className="flex items-center space-x-3">
                <span className="text-xl">{icon}</span>
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                onClick={handleDismiss}
                className="text-white text-lg font-bold p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors ml-4"
                aria-label="Dismiss message"
            >
                &times;
            </button>
        </div>
    );
};

export default NotificationMessage;
