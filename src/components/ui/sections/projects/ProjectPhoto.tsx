"use client"
import Image from "next/image";

import {Card} from "@/components/ui/shadcn/card";
import {useState} from "react";

function ProjectPhoto() {

    const [theme, setTheme] = useState("light");

    return (
            <Card onClick={(e) =>
                theme === "light" ? setTheme("dark") : setTheme("light")
        }>
            <div className="relative w-60 aspect-[1.62] mx-auto select-none">
                <Image
                    src={`/projects/cryptology/${theme}.png`}
                    alt={`cryptology screenshots ${theme}`}
                    fill
                />
            </div>
        </Card>
    );
}

export default ProjectPhoto