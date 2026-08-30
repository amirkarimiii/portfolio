import {
    ArticleCreationSectionWrapper
} from "@/features/article-publishing/components/ArticleCreationSectionWrapper";

interface EditArticlePageProps {
    params: Promise<{
        articleId: string;
    }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const { articleId } = await params;

    return (
        <>
            <ArticleCreationSectionWrapper uniqueId={articleId} />
        </>
    );
}