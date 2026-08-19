'use client';

import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {CircleCheck, CircleX, Clock} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";
import {articleFormSchema, type ArticleFormValues} from '@/features/article-publishing/schemas/articleFormSchema';
import ContentTab from "@/features/article-publishing/components/article/article-editor/ContentTab";
import {MetadataTab} from "@/features/article-publishing/components/article/article-metadata/MetadataTab";
import {useUnsecureDeleteModal} from "@/features/article-publishing/stores/useUnsecureDelete";

const defaultValues: ArticleFormValues = {
    title: '',
    slug: '',
    summary: '',
    coverImage: '',
    coverAltText: '',
    thumbnailImage: '',
    thumbnailAltText: '',
    tags: ['React', 'TypeScript', 'Next.js'],
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
    content: '',
};

export default function ArticleCreationSection() {

    const methods = useForm<ArticleFormValues>({
        resolver: zodResolver(articleFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const status = {
        success: [<CircleCheck key="success" color="green"/>, "saved as draft!"],
        failed: [<CircleX key="failed" color="red"/>, "failed to save!"],
        pending: [<Clock key="pending" color="gray"/>, "pending"],
    } as const;

    return (
        <FormProvider {...methods}>
            <section className="max-w-4xl mx-auto max-h-max mt-8">
                <div className="w-full flex flex-row justify-between px-5 py-2">
                    <div className="w-full h-max flex flex-row gap-2 my-auto">
                        <div className="w-5 aspect-square">
                            {status.success[0]}
                        </div>
                        <p>
                            {status.success[1]}
                        </p>
                    </div>
                    <div className="my-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Action</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex flex-col gap-0.5">
                                <DropdownMenuItem onClick={() => {
                                    console.log("unique id")
                                }} className="justify-center">
                                    Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    console.log("unique id")
                                }} className="justify-center">
                                    Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    useUnsecureDeleteModal.getState().openModal("uniqueId");
                                }} variant="destructive" className="justify-center">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                    <TabsContent value="related">Related Articles</TabsContent>
                </Tabs>
            </section>
        </FormProvider>
    );
}