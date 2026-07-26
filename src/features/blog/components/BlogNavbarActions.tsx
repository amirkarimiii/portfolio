import {ThemeButton} from "@/components/ui/buttons/ThemeButton";
import {BlogNavSearchbar} from "@/components/ui/inputs/BlogNavSearchbar";
import {HomeButton} from "@/components/ui/buttons/HomeButton";
import {LogoutButton} from "@/components/ui/buttons/LogoutButton";
import {NewArticleButton} from "@/components/ui/buttons/NewArticleButton";

export function BlogNavbarActions() {
    return (
        <>
            <div className="flex flex-row gap-1">
                <ThemeButton/>
                <LogoutButton/>
            </div>
            <div className="flex flex-row gap-1">
                <NewArticleButton/>
                <BlogNavSearchbar/>
                <HomeButton />
            </div>
        </>
    );
}