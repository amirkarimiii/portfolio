import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {CircleCheck, CircleX, Clock} from "lucide-react";

const ArticlePublishSection = () => {

    const status = {
        success: [<CircleCheck key="success" color="green" />, "saved as draft!"],
        failed: [<CircleX key="failed" color="red" />, "failed to save!"],
        pending: [<Clock key="pending" color="gray" />, "pending"],
    } as const;

    return (
        <section className="max-w-4xl mx-auto max-h-max mt-8 ">
            <div className="w-full h-12 px-5 py-3 flex flex-row gap-2">
                <div className="w-5 aspect-square mt-1">
                    {status.success[0]}
                </div>
                <p>
                    {status.success[1]}
                </p>
            </div>
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