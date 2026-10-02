import Image from "next/image";
import {TabsTrigger} from "@/shared/components/ui/tabs";

type ProjectsTabHeaderProps = {

    icon: string,
    name: string,

};

export function ProjectsTabHeader({name, icon}: ProjectsTabHeaderProps) {
    return (
        <TabsTrigger value={name}>
            <div className="relative w-4 h-4">
                <Image src={icon}
                       alt={`${name} icon`}
                       fill
                />
            </div>
            {name}
        </TabsTrigger>
    );
};