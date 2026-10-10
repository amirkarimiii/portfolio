import {ThemeButton} from "@/shared/components/buttons/ThemeButton";
import {NewArticleButton} from "@/features/admin/components/NewArticleButton";
import {LogoutButton} from "@/features/admin/components/LogoutButton";


export async function MainNavbarActions() {

    return (
        <>
            <div className="flex flex-row gap-1">
                <ThemeButton/>
                <NewArticleButton/>
            </div>
            <div className="flex flex-row gap-1">
                <LogoutButton/>
            </div>
        </>
    );
}