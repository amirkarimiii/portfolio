import Image from "next/image";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";

export default function NotFound() {
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
                Page Not Found (404)
            </h1>

            <Alert variant="default" className="w-70 mx-auto mt-5 md:w-140 text-left">
                <SearchX className="h-5 w-5" />
                <AlertDescription className="lg:text-base">
                    The page you are looking for has either been removed or never existed.
                </AlertDescription>
            </Alert>

            <div className="mt-8">
                <Button asChild>
                    <Link href="/">
                        Return to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}