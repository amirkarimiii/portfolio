'use client';

import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {CircleCheck, CircleX, Clock} from "lucide-react";
import {articleFormSchema, type ArticleFormValues} from '@/features/article-publishing/schemas/articleFormSchema';
import ContentTab, {
    emptyTiptapDocument
} from "@/features/article-publishing/components/article/article-editor/ContentTab";
import {MetadataTab} from "@/features/article-publishing/components/article/article-metadata/MetadataTab";
import {DraftedDropdown} from "./dropdowns/DraftedDropdown";
import {useDraftSyncStore} from '@/features/article-publishing/stores/useDraftSyncStore';
import {useArticleFormStore} from '@/features/article-publishing/stores/useArticleFormStore';
import {useAutoSaveDraft} from '@/features/article-publishing/hooks/useAutoSaveDraft';
import {useRestoreDraftFallback} from "@/features/article-publishing/hooks/useRestoreDraftFallback";
import {useArticlePublishListener} from '@/features/article-publishing/hooks/useArticlePublishListener';
import {RelatedArticlesTab} from "@/features/article-publishing/components/article/article-related/RelatedArticlesTab";

const defaultValues: ArticleFormValues = {
    title: '',
    slug: '',
    summary: '',
    coverImage: '',
    coverAltText: '',
    thumbnailImage: '',
    thumbnailAltText: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
    content: emptyTiptapDocument,
    relatedArticleIds: []
};

function AutoSaveListener() {
    useRestoreDraftFallback();
    useAutoSaveDraft();
    return null;
}

export function ArticleCreationSection() {
    const draftStatus = useDraftSyncStore((state) => state.status);
    const articleId = useArticleFormStore((state) => state.articleId);

    const methods = useForm<ArticleFormValues>({
        resolver: zodResolver(articleFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    useArticlePublishListener({
        currentArticleId: articleId,
    });

    const statusIcons = {
        idle: null,
        pending: (
            <div className="w-full h-max flex flex-row gap-2 my-auto">
                <div className="w-3.5 aspect-square">
                    <Clock className="text-gray-500 mt-px"/>
                </div>
                <p className="text-sm text-muted-foreground">Saving in drafts</p>
            </div>),
        success: (
            <div className="w-full h-max flex flex-row gap-2 my-auto">
                <div className="w-3.5 aspect-square mt-0.5">
                    <CircleCheck className="text-green-500"/>
                </div>
                <p className="text-sm text-green-600">Saved successfully in drafts!</p>
            </div>),
        failed: (
            <div className="w-full h-max flex flex-row gap-2 my-auto">
                <div className="w-3.5 aspect-square mt-0.5">
                    <CircleX className="text-red-500"/>
                </div>
                <p className="text-sm text-red-600">Failed to save in drafts!</p>
            </div>),
    };

    return (
        <FormProvider {...methods}>
            <AutoSaveListener/>
            <section className="max-w-4xl mx-auto max-h-max mt-8">
                <div className="w-full flex flex-row justify-between px-5 py-2">
                    <div className="w-full h-max flex flex-row gap-2 my-auto">
                        {statusIcons[draftStatus]}
                    </div>
                    <div className="my-auto">
                        <DraftedDropdown uniqueId={articleId} fromPage={true}/>
                    </div>
                </div>
                <Tabs defaultValue="metadata" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="metadata">Metadata</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="related">Related Articles</TabsTrigger>
                    </TabsList>
                    <TabsContent value="metadata">
                        <MetadataTab/>
                    </TabsContent>
                    <TabsContent value="content">
                        <ContentTab/>
                    </TabsContent>
                    <TabsContent value="related">
                        <RelatedArticlesTab/>
                    </TabsContent>
                </Tabs>
            </section>
        </FormProvider>
    );
}