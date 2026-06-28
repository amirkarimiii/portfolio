"use client"

import {useEffect} from "react";

export function AdminLoginListener() {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
                event.preventDefault();
                console.log("Shortcut triggered: Ctrl + Shift + A");
                alert("Shortcut triggered: Ctrl + Shift + A");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return null;
}