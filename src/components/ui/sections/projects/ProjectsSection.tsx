import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/shadcn/tabs";
import Image from "next/image";
import {Separator} from "@/components/ui/shadcn/separator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/shadcn/card";
import ProjectPhoto from "@/components/ui/sections/projects/ProjectPhoto";

export function ProjectsSection() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <h2 className="font-bold text-xl my-5 lg:mt-5 lg:text-3xl">💻 My Projects</h2>
                <Tabs defaultValue="cryptology">
                    <TabsList className="flex flex-wrap h-max">
                        <TabsTrigger value="cryptology">
                            <div className="relative w-4 h-4">
                                <Image src="projects/cryptology/cryptology_icon.svg"
                                       alt="cryptology icon"
                                       fill
                                       className="dark:invert"
                                />
                            </div>
                            Cryptology</TabsTrigger>
                        <TabsTrigger value="more">➕ More...</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cryptology">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    <h3 className="flex gap-2">
                                        <span className="relative w-5 h-5 inline-block my-auto">
                                            <Image src="projects/cryptology/cryptology_icon.svg"
                                                   alt="cryptology icon"
                                                   fill
                                                   className="dark:invert"
                                            />
                                        </span>
                                        <span className="text-lg ">
                                            Cryptology
                                        </span>
                                    </h3>
                                </CardTitle>
                                <CardDescription>
                                    A modern crypto dashboard built with <strong>Next.js App Router</strong>, designed as a portfolio
                                    project with a strong focus on <strong>clean architecture, type safety,</strong> and <strong>scalable
                                    frontend patterns.</strong>
                                    <br/><br/>It consumes data from a <strong>private backend API</strong> that aggregates and
                                    normalizes data from <strong>CoinGecko</strong> and <strong>Frankfurter</strong>.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div className="w-full max-w-sm">
                                        <ProjectPhoto/>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="more">

                    </TabsContent>
                </Tabs>
            </div>
            <Separator/>
        </section>
    );
}