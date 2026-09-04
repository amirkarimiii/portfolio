import { getCategories, getSubcategories, getStackEntries } from "../repository/stackRepository";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Separator } from "@/shared/components/ui/separator";
import { StackTabContent } from "./StackTabContent";

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

                    {categories.map((category) => (
                        <TabsContent
                            key={category.uniqueId}
                            value={category.uniqueId}
                            className="mt-4"
                        >
                            <StackTabContent
                                category={category}
                                subcategories={subcategories}
                                stackEntries={stackEntries}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            <Separator />
        </section>
    );
}