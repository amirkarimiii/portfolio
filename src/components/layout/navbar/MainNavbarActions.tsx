import {ThemeButton} from "@/components/ui/buttons/ThemeButton";
import {CvButton} from "@/components/ui/buttons/CVButton";
import {LogoutButton} from "@/components/ui/buttons/LogoutButton";
import {NewArticleButton} from "@/components/ui/buttons/NewArticleButton";

export function MainNavbarActions() {
    return (
        <>
            <div className="flex flex-row gap-1">
                <ThemeButton/>
                <NewArticleButton/>
            </div>
            <div className="flex flex-row gap-1">
                <CvButton/>
                <LogoutButton/>
            </div>
        </>
    );
}