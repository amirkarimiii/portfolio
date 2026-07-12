import EditorSection from "@/components/ui/sections/add-article/editor/EditorSection";
import TiptapSkeleton from "../../../../components/ui/sections/add-article/editor/EditorSectionSkeleton";
import {Suspense} from "react";

export default function NewArticle() {

    return (
        <>
            <Suspense fallback={<TiptapSkeleton />}>
                <EditorSection/>
            </Suspense>
        </>
    );
}