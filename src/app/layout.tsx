import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Provider} from './theme-provider'
import React from "react";
import {QueryProvider} from "@/shared/providers/QueryProvider";
import {AdminLoginListener} from "@/features/admin/components/AdminLoginListener";
import {DialogCloseListener} from "@/shared/components/layout/listeners/DialogCloseListener";
import {LoginDialog} from "@/features/admin/components/LoginDialog";
import {Toaster} from "@/shared/components/ui/sonner";
import {TooltipProvider} from "@/shared/components/ui/tooltip";
import {UnsecureDeleteModal} from "@/features/article-publishing/components/modals/UnsecureDeleteModal";


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
            <TooltipProvider>
            <QueryProvider>
                {children}
                <UnsecureDeleteModal/>
                <AdminLoginListener/>
                <DialogCloseListener/>
                <LoginDialog />
                <Toaster />
            </QueryProvider>
            </TooltipProvider>
        </Provider>
        </body>
        </html>
    );
}
