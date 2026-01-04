import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/shadcn/tabs";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/shadcn/alert";
import Image from "next/image";
import Link from "next/link";
import {ExternalLink} from "lucide-react";
import {Separator} from "@/components/ui/shadcn/separator";

export function ProjectsSection() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <h2 className="font-bold text-xl my-5 lg:mt-5 lg:text-3xl">💻 My Projects</h2>
                <Tabs defaultValue="cryptology">
                    <TabsList className="flex flex-wrap h-max">
                        <TabsTrigger value="cryptology">
                            <div className="relative w-4 h-4 ">
                                <Image src="/cryptology_icon.svg"
                                       alt="cryptology icon"
                                       fill
                                       className="dark:invert"
                                />
                            </div>
                            Cryptology</TabsTrigger>
                        <TabsTrigger value="more">➕ More...</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cryptology">

                    </TabsContent>
                    <TabsContent value="more">

                    </TabsContent>
                </Tabs>
            </div>
            <Separator/>
        </section>
    );
}