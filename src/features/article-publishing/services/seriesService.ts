import { SeriesRepository } from '../repository/seriesRepository';
import {PaginatedSeriesResult} from "@/features/article-publishing/types/pagination.type";

export class SeriesService {

    public static async getPaginatedSeries(params: {
        page?: string;
        pageSize?: number;
    }): Promise<PaginatedSeriesResult> {
        const rawPage = parseInt(params.page || '1', 10);
        const validPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
        const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20;

        return SeriesRepository.getPaginatedSeries({
            page: validPage,
            pageSize,
        });
    }
}