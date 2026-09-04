import { getCategories, getSubcategories, getStackEntries } from "../repository/stackRepository";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Separator } from "@/shared/components/ui/separator";

export async function StackSection() {
    const [categories, subcategories, stackEntries] = await Promise.all([
        getCategories(),
        getSubcategories(),
        getStackEntries(),
    ]);

    if (!categories || categories.length === 0) {
        return null;
    }

    const defaultTabValue = categories[0].uniqueId;

    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Tabs defaultValue={defaultTabValue}>
                    <TabsList variant="default" className="flex flex-wrap h-max justify-start gap-1">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category.uniqueId}
                                value={category.uniqueId}
                                className="flex items-center gap-2"
                            >
                                {category.icon && <span>{category.icon}</span>}
                                <span>{category.name}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => {
                        const categorySubcategories = subcategories.filter(
                            (sub) => sub.categoryId === category.uniqueId
                        );

                        const standaloneEntries = stackEntries.filter(
                            (entry) => entry.categoryId === category.uniqueId && entry.subcategoryId === null
                        );

                        return (
                            <TabsContent
                                key={category.uniqueId}
                                value={category.uniqueId}
                                className="mt-4 space-y-6"
                            >
                                {category.description && (
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {category.description}
                                    </p>
                                )}

                                <div className="space-y-8 pt-2">
                                    {/* بخش Subcategoryها همراه با StackEntryهای مربوط به هرکدام */}
                                    {categorySubcategories.length > 0 && (
                                        <div className="space-y-6">
                                            {categorySubcategories.map((sub) => {
                                                // فیلتر تکنولوژی‌هایی که متعلق به این subcategory هستند
                                                const subCategoryEntries = stackEntries.filter(
                                                    (entry) =>
                                                        entry.categoryId === category.uniqueId &&
                                                        entry.subcategoryId === sub.uniqueId
                                                );

                                                return (
                                                    <div key={sub.uniqueId} className="space-y-2 border-l-2 border-muted pl-4">
                                                        <h4 className="text-base font-semibold text-foreground">
                                                            {sub.name}
                                                        </h4>

                                                        {sub.description && (
                                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                                {sub.description}
                                                            </p>
                                                        )}

                                                        <div className="space-y-1 pt-1">
                                                            {subCategoryEntries.length > 0 ? (
                                                                subCategoryEntries.map((entry) => (
                                                                    <p key={entry.uniqueId} className="text-sm text-foreground/80">
                                                                        {entry.name}
                                                                    </p>
                                                                ))
                                                            ) : (
                                                                <p className="text-xs text-muted-foreground/60 italic">
                                                                    No technologies listed in this subcategory.
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* بخش تکنولوژی‌های بدون Subcategory (Cross-category / Standalone) */}
                                    <div className="space-y-3 pt-2">
                                        <h4 className="text-sm font-semibold text-foreground">
                                            Cross-category Technologies
                                        </h4>
                                        <div className="space-y-1">
                                            {standaloneEntries.length > 0 ? (
                                                standaloneEntries.map((entry) => (
                                                    <p key={entry.uniqueId} className="text-sm text-muted-foreground">
                                                        {entry.name}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-xs text-muted-foreground/60 italic">
                                                    No cross-category technologies found.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </div>
            <Separator />
        </section>
    );
}