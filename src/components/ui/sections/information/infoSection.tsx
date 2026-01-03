import {Separator} from "@/components/ui/shadcn/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/shadcn/tabs";

export function InfoSection() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Tabs defaultValue="focus">
                    <TabsList className="">
                        <TabsTrigger value="focus">🧠 Technical Focus</TabsTrigger>
                        <TabsTrigger value="language">🗣 Language</TabsTrigger>
                        <TabsTrigger value="education">🎓 Educational Background</TabsTrigger>
                    </TabsList>
                    <TabsContent value="focus">

                    </TabsContent>
                    <TabsContent value="language">

                    </TabsContent>
                    <TabsContent value="education">

                    </TabsContent>
                </Tabs>
            </div>
            <Separator/>
        </section>
    );
}