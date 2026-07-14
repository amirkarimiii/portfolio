'use client'
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Tiptap from './Tiptap'
import {Button} from "@/components/ui/shadcn/button";
import SimpleToolbar from "./toolbar/SimpleToolbar";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/shadcn/tabs";

const EditorSection = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight.configure({
                multicolor: true,
            }),
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'mt-3 min-h-[300px] w-full rounded-md border p-4 focus:outline-none mx-auto',
            },
        },
    })

    const handleLogContent = () => {
        if (!editor) return
        console.log(editor.getJSON());
    }

    return (
        <section className="max-w-4xl mx-auto max-h-max mt-8">
            <Button onClick={handleLogContent}>log</Button>
            <div className="flex flex-col">
                <Tabs defaultValue="simple" className="w-max self-center sticky top-2 z-10 mt-10">
                    <TabsList className="flex flex-wrap h-max">
                        <TabsTrigger value="simple">
                            <span className="text-xs">simple</span>
                        </TabsTrigger>
                        <TabsTrigger value="advance">
                            <span className="text-xs">advance</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="simple">
                        <div className="w-full bg-background  rounded-md border p-1 shadow-lg">
                            <SimpleToolbar editor={editor} />
                        </div>
                    </TabsContent>
                </Tabs>
                <Tiptap editor={editor}/>
                <Button className="self-center w-sm mt-3 mb-15" onClick={handleLogContent}>log</Button>
            </div>
        </section>
    )
}
export default EditorSection