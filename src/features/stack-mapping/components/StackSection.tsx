// features/stack-mapping/components/StackSection.tsx

import categoriesData from "@/mock-files/categories.json";
import { Category } from "../types/category.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Separator } from "@/shared/components/ui/separator";

export function StackSection() {
    const categories = categoriesData as Category[];

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

                    {categories.map((category) => (
                        <TabsContent
                            key={category.uniqueId}
                            value={category.uniqueId}
                            className="mt-4"
                        >
                            {category.description && (
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {category.description}
                                </p>
                            )}

                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            <Separator />
        </section>
    );
}