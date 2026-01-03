import {Separator} from "@/components/ui/shadcn/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/shadcn/tabs";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/shadcn/alert";
import {BadgeCheck} from "lucide-react";
import Image from "next/image";

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
                        <h2 className="font-bold text-xl mt-3 lg:mt-5 lg:text-3xl">🗣 Language</h2>
                        <p className="mt-10">
                            <span className="font-bold text-base lg:text-xl">I&apos;m a persian</span><br/>
                            <span className="text-sm lg:text-base">and my native language is persian.
                                <br/><br/>and also I&apos;m skilled in</span>
                        </p>
                        <div className="flex flex-col gap-3 mt-3 md:flex-row">
                            <Alert variant="default">
                                <AlertTitle className="text-base lg:text-xl">English</AlertTitle>
                                <AlertDescription className="lg:text-base">
                                    <ul className="list-disc ml-5 mt-5">
                                        <li className="mt-1">
                                            <strong>Reading:</strong> Comfortable reading and understanding English documentation and technical texts with ease.
                                        </li>
                                        <li className="mt-1">
                                            <strong>Listening:</strong> Strong listening skills; 95% of the YouTube content I consume is in English.
                                        </li>
                                        <li className="mt-1">
                                            <strong>Speaking:</strong> Able to hold conversations in English, though I feel slightly nervous due to limited recent practice with speaking partners.
                                        </li>
                                        <li className="mt-1">
                                            <strong>Writing:</strong> Solid writing skills at a similar level to my speaking ability, with room for rapid improvement through practice.
                                        </li>
                                    </ul>
                                </AlertDescription>
                            </Alert>
                            <Alert variant="default">
                                <AlertTitle className="text-base lg:text-xl">Français</AlertTitle>
                                <AlertDescription className="lg:text-base">
                                    Globalement, je suis débutant en français, mais je suis capable de communiquer efficacement. Mes compétences en compréhension écrite (reading), expression écrite (writing), expression orale (speaking) et compréhension orale (listening) progressent de manière parallèle et équilibrée.
                                    <div className="flex gap-2">
                                        <div className="relative mt-5 rounded-lg overflow-hidden flex-1 h-30 max-w-30">
                                            <Image src="/duolingo.png"
                                                   alt=""
                                                   fill
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-1 py-2 gap-3">
                                                <h3 className="font-bold w-22 lg:w-28 my-auto">Score actuel sur Duolingo</h3>
                                                <p className="font-bold text-4xl">93</p>
                                            </div>
                                            <p className="text-xs"><strong>À noter :</strong> j’apprends le français à partir de l’anglais, car Duolingo ne prend pas encore en charge le persan.</p>
                                        </div>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </TabsContent>
                    <TabsContent value="education">

                    </TabsContent>
                </Tabs>
            </div>
            <Separator/>
        </section>
    );
}