"use client"
import Image from "next/image";
import {useState, useSyncExternalStore} from "react";
import {useTheme} from "next-themes";
import {Card} from "@/shared/components/ui/card";
import {Skeleton} from "@/shared/components/ui/skeleton";
import {Badge} from "@/shared/components/ui/badge";

function useMounted() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

function ProjectPhoto() {
    const {resolvedTheme} = useTheme();
    const [theme, setTheme] = useState(resolvedTheme);
    const mounted = useMounted();

    if (!mounted) return (
        <Card className="p-5">
            <Skeleton className="w-full aspect-[1.62]"/>
            <Badge className="block mx-auto mt-5">{`tap to see dark/light mode 👆🏻`}</Badge>
        </Card>
    );

    return (
        <Card className="p-5" onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
        }>
            <div
                className={`relative w-full aspect-[1.62] mx-auto select-none cursor-pointer ${theme === "light" ? "hidden" : ""}`}>
                <Image
                    src={`/projects/cryptology/dark.png`}
                    alt={`cryptology screenshots dark`}
                    fill
                    priority
                />
            </div>
            <div
                className={`relative w-full aspect-[1.62] mx-auto select-none cursor-pointer ${theme === "dark" ? "hidden" : ""}`}>
                <Image
                    src={`/projects/cryptology/light.png`}
                    alt={`cryptology screenshots light`}
                    fill
                    priority
                />
            </div>

            <Badge className="block mx-auto mt-5">{`tap to see ${theme === "light" ? "dark" : "light"} mode 👆🏻`}</Badge>
        </Card>
    );
}

export default ProjectPhoto;