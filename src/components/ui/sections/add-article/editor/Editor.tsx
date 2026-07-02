import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";


export interface EditorHandle {
    save(): Promise<OutputData | undefined>;
}

const Editor = forwardRef<EditorHandle>((_, ref) => {
    const holderRef = useRef<HTMLDivElement | null>(null);
    const editorInstanceRef = useRef<EditorJS | null>(null);

    useEffect(() => {

        if (!holderRef.current || editorInstanceRef.current) return;

        editorInstanceRef.current = new EditorJS({
            holder: holderRef.current,
            placeholder: "what's up?... "
        });

        return () => {
            editorInstanceRef.current?.isReady
                .then(() => {
                    editorInstanceRef.current?.destroy();
                    editorInstanceRef.current = null;
                })
                .catch(() => {});
        };

    }, []);

    useImperativeHandle(ref, ()=> {
        return {
            async save() {
                if (!editorInstanceRef.current) return;
                return await editorInstanceRef.current.save();
            }
        };
    }, []);

    return (
        <div>
            <div ref={holderRef} />
        </div>
    );
});

Editor.displayName = "Editor";

export default Editor;