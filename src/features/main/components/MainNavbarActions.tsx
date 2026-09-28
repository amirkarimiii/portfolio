import {ThemeButton} from "src/shared/components/buttons/ThemeButton";
import {NewArticleButton} from "src/features/admin/components/NewArticleButton";
import {CvButton} from "src/shared/components/buttons/CVButton";
import {LogoutButton} from "src/features/admin/components/LogoutButton";

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