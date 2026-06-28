"use client"

import {useEffect} from "react";
import {useLoginDialog} from "@/stores/loginDialogStore";

export function AdminLoginListener() {

    const openDialog = useLoginDialog((s) => s.openDialog);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
                event.preventDefault();
                openDialog();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return null;
}