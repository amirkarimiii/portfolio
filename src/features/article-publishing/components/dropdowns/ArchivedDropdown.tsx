import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";
import {Settings} from "lucide-react";

type Props = {
    uniqueId: string;
};

export function ArchivedDropdown({ uniqueId }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-max h-max rounded-md p-1 cursor-pointer self-end"
                    data-no-card-navigate
                >
                    <div className="w-4 aspect-square">
                        <Settings/>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-0.5">
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    console.log("edit action")
                }} className="justify-center">
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    console.log("archive action")
                }} className="justify-center">
                    Publish
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    console.log("safe delete action")
                }} variant="destructive" className="justify-center">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}