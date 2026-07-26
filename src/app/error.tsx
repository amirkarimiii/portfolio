"use client"

import Image from "next/image";
import {InfoIcon} from "lucide-react";
import {Alert, AlertDescription} from "@/shared/components/ui/alert";

export default function Error() {
    return (
        <div>
            <div className="relative w-30 h-30 mt-30 mx-auto md:w-40 md:h-40 md:mt-20">
                <Image
                    src="/face.svg"
                    alt="amir's face"
                    fill
                />
            </div>
            <p className="mt-10 font-bold text-3xl w-max mx-auto">Some Error Occurred</p>
            <Alert variant="default" className="w-70 mx-auto mt-5 md:w-140">
                <InfoIcon/>
                <AlertDescription className="lg:text-base">
                    This message is not normally expected to appear; however, an unexpected error may have occurred.
                    Please wait while the issue is being resolved.
                </AlertDescription>
            </Alert>
        </div>
    );
}