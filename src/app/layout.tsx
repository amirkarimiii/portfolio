import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Provider} from './theme-provider'
import React from "react";
import {AdminLoginListener} from "@/components/layout/listeners/AdminLoginListener";
import {LoginDialog} from "@/components/layout/dialogs/LoginDialog";
import {DialogCloseListener} from "@/components/layout/listeners/DialogCloseListener";

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
            <AdminLoginListener/>
            <DialogCloseListener/>
            <LoginDialog />
        </Provider>
        </body>
        </html>
    );
}
