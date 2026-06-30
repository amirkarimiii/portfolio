"use client";

import {useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";

interface EditorProps {
    onChange: (data: unknown) => void;
}

export default function Editor({ onChange }: EditorProps) {
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (editorRef.current) return;

        editorRef.current = new EditorJS({
            holder: "editorjs-container",
            placeholder: "Start writing your article...",
            async onChange(api) {
                const savedData = await api.saver.save();
                onChange(savedData);
            },
        });
        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === "function") {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [onChange]);

    return (
        <div className="w-full border rounded-lg p-6 bg-background">
            <div id="editorjs-container" className="prose dark:prose-invert max-w-none" />
        </div>
    );
}