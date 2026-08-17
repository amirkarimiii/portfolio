import React from 'react';
import {ArticleCardData, SeriesCardData} from "src/features/article-publishing/types/reference-card.type";
import {
    UnavailableContentCard
} from "src/features/article-publishing/components/cards-and-modals/cards/UnavailableContentCard";
import {ArticleCard} from "src/features/article-publishing/components/cards-and-modals/cards/ArticleCard";
import {SeriesCard} from "src/features/article-publishing/components/cards-and-modals/cards/SeriesCard";


export type ContentCardProps =
    | {
    type: 'article';
    data: ArticleCardData;
    isUnavailable?: boolean;
    className?: string;
    selective?: boolean
    target?: "_self" | "_blank"
}
    | {
    type: 'series';
    data: SeriesCardData;
    isUnavailable?: boolean;
    className?: string;
    selective?: boolean
    target?: "_self" | "_blank"
}
    | {
    type?: 'article' | 'series';
    data?: null;
    isUnavailable: true;
    className?: string;
};

export const ContentCard: React.FC<ContentCardProps> = (props) => {
    if (props.isUnavailable || !props.data) {
        return <UnavailableContentCard className={props.className} />;
    }

    if (props.type === 'series') {
        return (
            <SeriesCard
                data={props.data}
                className={props.className}
                selective={props.selective}
                target={props.target}
            />
        );
    }

    return (
        <ArticleCard
            data={props.data}
            className={props.className}
            target={props.target}
            selective={props.selective}
        />
    );
};