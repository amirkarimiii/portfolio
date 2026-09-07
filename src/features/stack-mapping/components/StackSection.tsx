import {Separator} from "@/shared/components/ui/separator";
import {StackTabsSwitcher} from "./StackTabsSwitcher";
import {StackService} from "@/features/stack-mapping/service/stackService";

export async function StackSection() {
    const [categories, subcategories, stackEntries] = await Promise.all([
        StackService.getCategories(),
        StackService.getSubcategories(),
        StackService.getStackEntries(),
    ]);

    if (!categories || categories.length === 0) {
        return null;
    }

    const defaultTabValue = categories[0].uniqueId;

    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <StackTabsSwitcher
                    categories={categories}
                    subcategories={subcategories}
                    stackEntries={stackEntries}
                    defaultValue={defaultTabValue}
                />
            </div>
            <Separator />
        </section>
    );
}