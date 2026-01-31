"use client"
import Image from "next/image";

import {Card} from "@/components/ui/shadcn/card";
import {useState} from "react";
import {Badge} from "@/components/ui/shadcn/badge";

function ProjectPhoto() {

    const [theme, setTheme] = useState("light");

    return (
        <Card className="p-5" onClick={(e) =>
            theme === "light" ? setTheme("dark") : setTheme("light")
        }>
            <div className="relative w-full aspect-[1.62] mx-auto select-none cursor-pointer">
                <Image
                    src={`/projects/cryptology/${theme}.png`}
                    alt={`cryptology screenshots ${theme}`}
                    fill
                />
            </div>
            <Badge className="block mx-auto mt-5">{`tap to see ${theme === "light" ? "dark" : "light"} mode 👆🏻`}</Badge>
        </Card>
    );
}

export default ProjectPhoto