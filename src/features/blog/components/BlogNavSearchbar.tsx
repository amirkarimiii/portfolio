"use client"

import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/shadcn/input-group";
import {Search} from "lucide-react";

export function BlogNavSearchbar() {
    return (
        <InputGroup className="max-w-xs h-7.5 w-40 sm:w-50">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
                <Search size={15}/>
            </InputGroupAddon>
        </InputGroup>
    );
}