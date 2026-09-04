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
                    <TabsList className="flex flex-wrap h-max justify-start gap-1">
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

                                <div className="space-y-6 pt-2">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-foreground">
                                            Subcategories in this field
                                        </h4>
                                        <div className="space-y-1">
                                            {categorySubcategories.length > 0 ? (
                                                categorySubcategories.map((sub) => (
                                                    <p key={sub.uniqueId} className="text-sm text-muted-foreground">
                                                        {sub.name}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-xs text-muted-foreground/60 italic">
                                                    No subcategories found.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-foreground">
                                            Standalone Technologies
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
                                                    No standalone technologies found.
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