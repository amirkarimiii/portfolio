import {Separator} from "@/shared/components/ui/separator";
import {IdentityCard} from "@/features/article-publishing/article-metadata/card-components/IdentityCard";
import {ClassificationCard} from "@/features/article-publishing/article-metadata/card-components/ClassificationCard";
import {SEOCard} from "@/features/article-publishing/article-metadata/card-components/SEOCard";
import {BaseAssetsForm} from "@/features/article-publishing/components/article-form/BaseAssetsForm";

export function MetadataTab() {
    return (
        <div className="flex flex-col gap-3 pb-20">
            <div>
                <div>
                    <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">Identity</h2>
                </div>
                <IdentityCard/>
                <Separator/>
            </div>

            <div>
                <div>
                    <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">Assets</h2>
                </div>
                <BaseAssetsForm />
                <Separator/>
            </div>

            <div>
                <div>
                    <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">Classification</h2>
                </div>
                <ClassificationCard/>
                <Separator/>

            </div>

            <div>
                <div>
                    <h2 className="font-bold text-xl my-5 ml-2 md:ml-0 lg:mt-5 lg:text-3xl">SEO</h2>
                </div>
                <SEOCard/>
            </div>
        </div>
    );
}