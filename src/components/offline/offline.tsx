"use client";

import {useEffect, useState} from "react";

export const Offline = () => {
    const [isOffline, setIsOffline] = useState(false);
    const updateOfflineStatus = () => {
        document.documentElement.classList.toggle("is-offline", !navigator.onLine);
        setIsOffline(!navigator.onLine);
    }
    useEffect(() => {
        updateOfflineStatus()
        window.addEventListener("online", updateOfflineStatus);
        window.addEventListener("offline", updateOfflineStatus);
    }, []);
    return isOffline ? <div className="offline-badge">You are offline!</div> : <></>;
};
