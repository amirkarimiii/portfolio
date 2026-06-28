import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Provider} from './theme-provider'
import {Navbar} from "../components/layout/navbar/Navbar";
import React from "react";
import {MainNavbarActions} from "../components/layout/navbar/MainNavbarActions";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


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
            {children}
        </Provider>
        </body>
        </html>
    );
}
