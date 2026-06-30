"use client";

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

import EditorJS, { OutputData } from "@editorjs/editorjs";


export interface EditorHandle {
    save(): Promise<OutputData | undefined>;
}

const Editor = forwardRef<EditorHandle>((_, ref) => {

    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (editorRef.current || !holderRef.current) {
            return;
        }

        editorRef.current = new EditorJS({
            holder: holderRef.current,
            placeholder: "Start writing your article...",
        });

        return () => {
            editorRef.current?.isReady
                .then(() => {
                    editorRef.current?.destroy();
                    editorRef.current = null;
                })
                .catch(() => {
                    editorRef.current = null;
                });
        };
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            async save() {
                if (!editorRef.current) {
                    return;
                }
                return await editorRef.current.save();
            },
        }),
        []
    );

    return (
        <div className="w-full border rounded-lg p-6">
            <div
                ref={holderRef}
                className="prose dark:prose-invert max-w-none"
            />
        </div>
    );
});

Editor.displayName = "Editor";

export default Editor;