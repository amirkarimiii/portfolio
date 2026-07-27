"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled Error captured:", error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-10 text-center">
            <div className="relative w-30 h-30 mt-20 mx-auto md:w-40 md:h-40 md:mt-20">
                <Image
                    src="/face.svg"
                    alt="Amir's face"
                    fill
                    priority
                />
            </div>

            <h1 className="mt-10 font-bold text-3xl w-max mx-auto">
                Something Went Wrong
            </h1>

            <Alert variant="destructive" className="w-70 mx-auto mt-5 md:w-140 text-left">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="lg:text-base">
                    An unexpected error occurred while processing your request. Please try again or contact support if the issue persists.
                    {error.digest && (
                        <span className="block mt-2 text-xs opacity-75 font-mono">
                            Error Reference: {error.digest}
                        </span>
                    )}
                </AlertDescription>
            </Alert>
        </div>
    );
}