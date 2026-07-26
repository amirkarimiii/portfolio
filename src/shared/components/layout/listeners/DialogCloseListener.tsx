"use client"

import {useEffect} from "react";
import {useLoginDialog} from "@/features/admin/stores/loginDialogStore";


export function DialogCloseListener() {

    const closeDialog = useLoginDialog((s) => s.closeDialog);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeDialog();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return null;
}