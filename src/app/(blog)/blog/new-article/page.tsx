"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Button } from "@/components/ui/shadcn/button";

const Editor = dynamic(() => import("@/components/ui/sections/add-article/editor/Editor"), {
    ssr: false,
});

export default function NewArticle() {
    const [blocksData, setBlocksData] = React.useState<unknown>(null);

    const handleLogData = () => {
        console.log("Current Editor.js Data:", blocksData);
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">New Article</h1>
                <Button onClick={handleLogData} type="button">
                    Log JSON Data
                </Button>
            </div>

            <Editor onChange={setBlocksData} />
        </div>
    );
}