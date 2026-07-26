"use client"

import {useTheme} from "next-themes";
import {Moon, SunDim} from 'lucide-react';
import {Button} from "@/shared/components/ui/button";

export const ThemeButton = () => {

    const {resolvedTheme, setTheme} = useTheme();

    return (
        <Button variant="outline"
                onClick={() => {
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }}
                className="w-max h-max rounded-md p-1 cursor-pointer"
        >
            <div className="w-5 h-5 rounded-md select-none">
                <Moon className="hidden dark:block"/>
                <SunDim className="block dark:hidden"/>
            </div>
        </Button>
    );
};