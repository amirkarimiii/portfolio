import {Pencil} from "lucide-react";
import {Button} from "@/components/ui/shadcn/button";

export function NewArticleButton() {
    return (
        <Button
            variant="outline"
            className="w-max h-max rounded-md p-1 cursor-pointer"
        >
            <div className="w-5 h-5 rounded-md select-none">
                <Pencil/>
            </div>
        </Button>
    );
}