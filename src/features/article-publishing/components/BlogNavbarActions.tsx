import {ThemeButton} from "src/shared/components/buttons/ThemeButton";
import {LogoutButton} from "src/features/admin/components/LogoutButton";
import {HomeButton} from "src/shared/components/buttons/HomeButton";


export function BlogNavbarActions() {
    return (
        <>
            <div className="flex flex-row gap-1">
                <ThemeButton/>
                <LogoutButton/>
            </div>
            <div className="flex flex-row gap-1">
                <HomeButton />
            </div>
        </>
    );
}