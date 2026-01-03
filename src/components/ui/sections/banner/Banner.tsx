import {MyImage} from "@/components/ui/sections/banner/MyImage";
import {BadgeCheck} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/shadcn/alert";

export const Banner = () => {
    return (
        <section className="max-w-4xl py-2 px-5 mx-auto flex flex-col gap-10 lg:flex-row-reverse lg:mt-20">
            <div className="w-full">
                <MyImage />
            </div>
            <div>
                <h1 className="font-bold text-3xl lg:text-5xl">Hi, I’m Amir 👋</h1>
                <p className="text-sm mt-2 lg:mt-4 lg:text-base">
                    <strong>Frontend Developer</strong> focused on building&nbsp;
                    <strong>high-performance, scalable web applications</strong> with&nbsp;
                    <strong>Next.js.</strong>
                </p>
                <div className="flex flex-col lg:flex-col-reverse">
                    <Alert variant="verified" className="mt-4">
                        <BadgeCheck/>
                        <AlertTitle className="lg:text-base">I’m open to full-time remote opportunities</AlertTitle>
                        <AlertDescription className="lg:text-base">
                            where I can contribute to impactful products, adapt quickly to team needs, and continue growing as an engineer.
                        </AlertDescription>
                    </Alert>
                    <p className="mt-4 text-sm lg:text-base">
                        I work primarily with&nbsp;
                        <strong>React (App Router & Server Components)</strong> and&nbsp;
                        <strong>TypeScript</strong>, with a strong emphasis on&nbsp;
                        <strong>clean architecture</strong>,&nbsp;
                        <strong>performance optimization</strong>, and writing code that scales well within teams.
                    </p>
                </div>
            </div>
        </section>
    );
};