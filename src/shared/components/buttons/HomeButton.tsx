import Link from "next/link";
import {Button} from "@/components/ui/shadcn/button";
import {HomeIcon} from "lucide-react";
import {Paths} from "@/common/constants/paths";


export function HomeButton() {
    return (
        <Button
            variant="outline"
            className="w-max h-max rounded-md p-1 cursor-pointer"
        >
            <Link
                href={Paths.home}
                className="flex"
                rel="noopener noreferrer"
            >
                <div className="w-5 h-5 rounded-md select-none">
                    <HomeIcon/>
                </div>
            </Link>
        </Button>
    );
}