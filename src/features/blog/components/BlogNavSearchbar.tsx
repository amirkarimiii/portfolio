"use client"

import {Search} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/shared/components/ui/input-group";

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