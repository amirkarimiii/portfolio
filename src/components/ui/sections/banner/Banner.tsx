import {MyImage} from "@/components/ui/sections/banner/MyImage";
import {BadgeCheck, ExternalLink} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/shadcn/alert";
import {Separator} from "@/components/ui/shadcn/separator";
import {Button} from "@/components/ui/shadcn/button";
import Link from "next/link";

export const Banner = () => {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 flex flex-col gap-10 lg:flex-row-reverse mb-5 lg:mt-20">
                <div className="w-full lg:my-auto">
                    <MyImage/>
                </div>
                <div>
                    <h1 className="font-bold text-3xl lg:text-5xl">Hi, I’m Amir 👋</h1>
                    <p className="text-sm mt-2 lg:mt-4 lg:text-base">
                        <strong>Frontend Developer</strong> focused on building&nbsp;
                        <strong>high-performance, scalable web applications</strong> with&nbsp;
                        <strong>Next.js.</strong>
                    </p>
                    <div className="flex flex-col">
                        <p className="mt-4 text-sm lg:text-base">
                            I work primarily with&nbsp;
                            <strong>React (App Router & Server Components)</strong> and&nbsp;
                            <strong>TypeScript</strong>, with a strong emphasis on&nbsp;
                            <strong>clean architecture</strong>,&nbsp;
                            <strong>performance optimization</strong>, and writing code that scales well within teams.
                        </p>
                        <Button asChild variant="outline" className="block w-full mx-auto text-xs h-max border-4 mt-2">
                            <Link
                                href="/blog"
                                target="_blank"
                                className="flex"
                                rel="noopener noreferrer"
                            >
                                Checkout my Blog
                            </Link>
                        </Button>
                        <Alert variant="verified" className="mt-4">
                            <BadgeCheck/>
                            <AlertTitle className="lg:text-base">I’m open to full-time remote opportunities</AlertTitle>
                            <AlertDescription className="lg:text-base">
                                where I can contribute to impactful products, adapt quickly to team needs, and continue
                                growing as an engineer.
                            </AlertDescription>
                        </Alert>
                    </div>
                    <div className="flex gap-1">
                        <Button asChild className="flex-1 text-xs mt-2">
                            <Link
                                href="https://www.linkedin.com/in/amirhosein-karimkhani/"
                                target="_blank"
                                className="flex"
                                rel="noopener noreferrer"
                            >
                                Checkout my Github
                                <span className="w-3">
                                    <ExternalLink/>
                                </span>
                            </Link>
                        </Button>
                        <Button asChild className="flex-1 text-xs mt-2">
                            <Link
                                href="https://www.linkedin.com/in/amirhosein-karimkhani/"
                                target="_blank"
                                className="flex items-center justify-center gap-1"
                                rel="noopener noreferrer"
                            >
                                Checkout my Linkedin
                                <span className="w-3">
                                    <ExternalLink/>
                                </span>
                            </Link>
                        </Button>
                    </div>
                    <Button asChild variant="outline" className="block w-full mx-auto text-xs h-max border-4 mt-2">
                        <a href="#contact">Get in Touch</a>
                    </Button>
                </div>
            </div>
            <Separator/>
        </section>
    );
};