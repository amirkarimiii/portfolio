import {ThemeButton} from "@/components/ui/buttons/ThemeButton";
import {HomeButton} from "@/components/ui/buttons/HomeButton";
import {BlogNavSearchbar} from "@/components/ui/inputs/BlogNavSearchbar";

export function BlogNavbarActions() {
    return (
        <>
            <ThemeButton/>
            <div className="flex flex-row gap-1">
                <BlogNavSearchbar/>
                <HomeButton />
            </div>
        </>
    );
}