import type {Metadata} from "next";
import {Navbar} from "@/components/layout/Navbar";
import {BlogNavbarActions} from "@/components/layout/BlogNavbarActions";
import React from "react";

export const metadata: Metadata = {
    title: {
        default: "Blog | Amir Karimi",
        template: "%s | Blog | Amir Karimi",
    },

    description:
        "Articles about Next.js, React, TypeScript, frontend architecture, performance optimization, and software engineering.",

    keywords: [
        "Next.js Blog",
        "React Articles",
        "TypeScript",
        "Frontend Development",
        "Software Engineering",
        "Web Performance",
        "Programming",
    ],

    openGraph: {
        title: "Amir Karimi Blog",
        description:
            "Articles about Next.js, React, TypeScript, frontend architecture, and modern web development.",
        url: "https://www.a-karimkhani.ir/blog",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Amir Karimi Blog",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Amir Karimi Blog",
        description:
            "Articles about Next.js, React, TypeScript, and modern frontend development.",
    },

    alternates: {
        canonical: "https://www.a-karimkhani.ir/blog",
    },
};

export default function BlogLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto">
            <Navbar action={<BlogNavbarActions/>}/>
            <main>
                {children}
            </main>
        </div>
    );
}