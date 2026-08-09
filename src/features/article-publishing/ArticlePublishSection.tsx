import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs"

const ArticlePublishSection = () => {

    return (
        <section className="max-w-4xl mx-auto max-h-max mt-8">
            <Tabs defaultValue="metadata" className="w-full">
                <TabsList className="w-full ">
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="related">Related Articles</TabsTrigger>
                </TabsList>
                <TabsContent value="metadata">Metadata</TabsContent>
                <TabsContent value="content">Content</TabsContent>
                <TabsContent value="related">Related Articles</TabsContent>
            </Tabs>
        </section>
    )
}
export default ArticlePublishSection