"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Card} from "@/components/ui/shadcn/card";
import {Skeleton} from "@/components/ui/shadcn/skeleton";
import {Badge} from "@/components/ui/shadcn/badge";



function ProjectPhoto() {

    const {resolvedTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState(resolvedTheme);


    useEffect(() => {
        setMounted(true);
        if (resolvedTheme) {
            setTheme(resolvedTheme as "dark" | "light");
        }
    }, [resolvedTheme]);


    if (!mounted) return (
        <Card className="p-5">
            <Skeleton className="w-full aspect-[1.62]"/>
            <Badge className="block mx-auto mt-5">{`tap to see dark/light mode 👆🏻`}</Badge>
        </Card>
    );

    return (
        <Card className="p-5" onClick={(e) =>
            theme === "light" ? setTheme("dark") : setTheme("light")
        }>
            <div
                className={`relative w-full aspect-[1.62] mx-auto select-none cursor-pointer ${theme === "light" ? "hidden" : ""}`}>
                <Image
                    src={`/projects/cryptology/dark.png`}
                    alt={`cryptology screenshots dark`}
                    fill
                    preload
                />
            </div>
            <div
                className={`relative w-full aspect-[1.62] mx-auto select-none cursor-pointer ${theme === "dark" ? "hidden" : ""}`}>
                <Image
                    src={`/projects/cryptology/light.png`}
                    alt={`cryptology screenshots light`}
                    fill
                    preload
                />
            </div>

            <Badge className="block mx-auto mt-5">{`tap to see ${theme === "light" ? "dark" : "light"} mode 👆🏻`}</Badge>
        </Card>
    );
}

export default ProjectPhoto