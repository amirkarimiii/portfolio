import {useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";


export function Editor() {

    const holderRef = useRef<HTMLDivElement | null>(null);
    const editorInstanceRef = useRef<EditorJS | null>(null);

    useEffect(() => {

        if (!holderRef.current || editorInstanceRef.current) return;

        editorInstanceRef.current = new EditorJS({
            holder: holderRef.current,
            placeholder: "what's up?... "
        });

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };

    }, []);

    return (
        <div ref={holderRef}>

        </div>
    );
}