import {ThemeButton} from "src/components/ui/buttons/ThemeButton";
import {HomeButton} from "src/components/ui/buttons/HomeButton";
import {BlogNavSearchbar} from "src/components/ui/inputs/BlogNavSearchbar";

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