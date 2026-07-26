import {Metadata} from "next";
import {Navbar} from "@/shared/components/layout/Navbar";
import {MainNavbarActions} from "@/features/main/MainNavbarActions";

export const metadata: Metadata = {
    title: "amir's portfolio",
    description: "Hi, I’m Amir. Frontend Developer focused on building high-performance, scalable web applications with Next.js.",
    keywords: [
        "Frontend Developer",
        "Next.js",
        "React",
        "TypeScript",
        "Remote Developer",
        "High-performance Web",
        "Scalable Applications",
        "App Router",
        "Server Components",
        "Performance Optimization",
        "Clean Code",
    ],
    authors: [{ name: "amir karimi", url: "https://www.a-karimkhani.ir" }],
    creator: "amir karimi",
    publisher: "amir karimi",
    metadataBase: new URL("https://www.a-karimkhani.ir"),

    openGraph: {
        title: {
            default: "Amir Karimi",
            template: "%s | Amir Karimi",
        },
        description: "Next.js & React Frontend Developer • TypeScript expert • Crafting fast, scalable web apps • Open to exciting full-time remote opportunities",
        url: "https://www.a-karimkhani.ir",
        siteName: "amir karimi Portfolio",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "amir karimi's portfolio",
            },
        ],
        locale: "fa_IR",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "amir karimi's portfolio",
        description: "Next.js & React Frontend Developer • TypeScript expert • Crafting fast, scalable web apps • Open to exciting full-time remote opportunities",
        // creator: "@yourusername"
    },

    alternates: {
        canonical: "https://www.a-karimkhani.ir",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="container mx-auto">
                <Navbar action={MainNavbarActions()} />
                <main>{children}</main>
            </div>
        </>
    );
}