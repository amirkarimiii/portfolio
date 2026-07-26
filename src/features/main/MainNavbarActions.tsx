import {ThemeButton} from "@/shared/components/buttons/ThemeButton";
import {NewArticleButton} from "@/features/admin/components/NewArticleButton";
import {CvButton} from "@/shared/components/buttons/CVButton";
import {LogoutButton} from "@/features/admin/components/LogoutButton";

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