import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Provider} from './theme-provider'
import {Navbar} from "@/components/layout/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
        title: "amir karimi's portfolio",
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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Provider>
            <div className="container mx-auto">
                <Navbar/>
                <main>{children}</main>
            </div>
        </Provider>
        </body>
        </html>
    );
}
