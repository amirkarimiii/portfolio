import {Separator} from "@/shared/components/ui/separator";
import {IdentityCard} from "@/features/article-publishing/article-metadata/card-components/IdentityCard";
import {AssetsCard} from "@/features/article-publishing/article-metadata/card-components/AssetsCard";
import {ClassificationCard} from "@/features/article-publishing/article-metadata/card-components/ClassificationCard";
import {SEOCard} from "@/features/article-publishing/article-metadata/card-components/SEOCard";

export function MetadataTab() {
    return (
        <>
            <div>
                <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">Identity</h2>
            </div>
            <IdentityCard/>
            <Separator/>
            <div>
                <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">Assets</h2>
            </div>
            <AssetsCard/>
            <Separator/>
            <div>
                <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">Classification</h2>
            </div>
            <ClassificationCard/>
            <Separator/>
            <div>
                <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">SEO</h2>
            </div>
            <SEOCard/>
            <Separator/>
        </>
    );
}