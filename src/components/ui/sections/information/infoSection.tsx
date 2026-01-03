import {Separator} from "@/components/ui/shadcn/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/shadcn/tabs";

export function InfoSection() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Tabs defaultValue="focus">
                    <TabsList className="flex flex-wrap h-max">
                        <TabsTrigger value="focus">🧠 Technical Focus</TabsTrigger>
                        <TabsTrigger value="language">🗣 Language</TabsTrigger>
                        <TabsTrigger value="education">🎓 Educational Background</TabsTrigger>
                    </TabsList>
                    <TabsContent value="focus">
                        <h2 className="font-bold text-xl mt-3 lg:mt-5 lg:text-3xl">🧠 Technical Focus</h2>
                        <ul className="list-disc ml-10 mt-5">
                            <li className="mt-1">
                                <strong>Next.js & React</strong> — App Router, Server Components, Server Actions
                            </li>
                            <li className="mt-1">
                                <strong>TypeScript</strong> — strict mode, type-safe APIs
                            </li>
                            <li className="mt-1">
                                <strong>UI & Styling</strong> — Tailwind CSS, accessible and maintainable UI systems
                            </li>
                            <li className="mt-1">
                                <strong>State & Data</strong> — TanStack Query, Zustand, schema-driven validation
                            </li>
                            <li className="mt-1">
                                <strong>Performance</strong> — Suspense, lazy loading, image & font optimization
                            </li>
                            <li className="mt-1">
                                <strong>Engineering Practices</strong> — clean code, scalable architecture, thoughtful abstractions
                            </li>
                        </ul>
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