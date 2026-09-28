import {ThemeButton} from "@/shared/components/buttons/ThemeButton";
import {NewArticleButton} from "@/features/admin/components/NewArticleButton";
import {CvButton} from "@/shared/components/buttons/CVButton";
import {LogoutButton} from "@/features/admin/components/LogoutButton";
import {BannerService} from "@/features/main/services/bannerService";


export async function MainNavbarActions() {

    const person = await BannerService.getPerson();

    const cvUrl = person?.assets.find(value => value.type == "document")?.url;

    return (
        <>
            <div className="flex flex-row gap-1">
                <ThemeButton/>
                <NewArticleButton/>
            </div>
            <div className="flex flex-row gap-1">
                <CvButton url={cvUrl}/>
                <LogoutButton/>
            </div>
        </>
    );
}