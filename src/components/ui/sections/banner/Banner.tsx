import {MyImage} from "@/components/ui/sections/banner/MyImage";

export const Banner = () => {
    return (
        <section className="max-w-3xl py-2 px-5 mx-auto flex flex-col gap-10">
            <div className="w-full">
                <MyImage />
            </div>
            <div className="">
                <h1 className="font-bold text-3xl">Hi, I’m Amir 👋</h1>
                <p className="text-sm mt-2">
                    <strong>Frontend Developer</strong> focused on building&nbsp;
                    <strong>high-performance, scalable web applications</strong> with&nbsp;
                    <strong>Next.js.</strong>
                </p>
                <p className="mt-4 text-sm">
                    I work primarily with&nbsp;
                    <strong>React (App Router & Server Components)</strong> and&nbsp;
                    <strong>TypeScript</strong>, with a strong emphasis on&nbsp;
                    <strong>clean architecture</strong>,&nbsp;
                    <strong>performance optimization</strong>, and writing code that scales well within teams.
                </p>
            </div>
        </section>
    );
};