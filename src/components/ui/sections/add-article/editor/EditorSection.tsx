import {Button} from "@/components/ui/shadcn/button";
import React, {useRef} from "react";
import type {EditorHandle} from "@/components/ui/sections/add-article/editor/Editor";
import type {OutputData} from "@editorjs/editorjs";
import dynamic from "next/dynamic";

const Editor = dynamic(
    () => import("@/components/ui/sections/add-article/editor/Editor"),{
        ssr: false,
    }
);


export function EditorSection() {

    const editorRef = useRef<EditorHandle>(null);
    const handleLogData = async () => {
        const data: OutputData | undefined = await editorRef.current?.save();

        console.log("Editor Data:", data);
    };


    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    New Article
                </h1>

                <Button
                    type="button"
                    onClick={handleLogData}
                >
                    Log JSON Data
                </Button>
            </div>
            <Editor ref={editorRef} />
        </div>
    );
}