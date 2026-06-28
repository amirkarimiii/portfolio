import {ThemeButton} from "@/components/ui/buttons/ThemeButton";
import {BlogNavSearchbar} from "@/components/ui/inputs/BlogNavSearchbar";
import {HomeButton} from "@/components/ui/buttons/HomeButton";

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