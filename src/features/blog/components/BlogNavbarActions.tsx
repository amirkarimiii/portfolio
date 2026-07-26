import {ThemeButton} from "@/shared/components/buttons/ThemeButton";
import {LogoutButton} from "@/features/admin/components/LogoutButton";
import {HomeButton} from "@/shared/components/buttons/HomeButton";
import {NewArticleButton} from "@/features/admin/components/NewArticleButton";
import {BlogNavSearchbar} from "@/features/blog/components/BlogNavSearchbar";


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