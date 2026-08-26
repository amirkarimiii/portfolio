import fs from 'fs/promises';
import path from 'path';
import { ulid } from 'ulid';
import type { SeriesFormValues } from '../schemas/seriesFormSchema';

const NEW_SERIES_FILE_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-series.json'
);

const EXISTING_SERIES_FILE_PATH = path.join(
    process.cwd(),
    'src/mock-files/series.json'
);

export interface Series {
    uniqueId: string;
    slug: string;
    title: string;
    description: string;
    defaultTags: string[];
    coverImage: string;
    coverAltText: string;
    thumbnailImage: string;
    thumbnailAltText: string;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl: string | null;
    inboundReferencingIds: string[];
    createdAt: string;
    updatedAt: string;
}

interface SeriesJsonStructure {
    series: Series[];
}

export class SeriesRepository {
    /**
     * Checks whether a slug already exists in new-series.json or existing series.json
     */
    public static async isSlugExists(slug: string): Promise<boolean> {
        const paths = [NEW_SERIES_FILE_PATH, EXISTING_SERIES_FILE_PATH];
        const normalizedTargetSlug = slug.trim().toLowerCase();

        for (const filePath of paths) {
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                const parsed = JSON.parse(content);
                const seriesList: Array<{ slug: string }> = parsed.series || [];

                const exists = seriesList.some(
                    (item) => item.slug?.trim().toLowerCase() === normalizedTargetSlug
                );

                if (exists) return true;
            } catch {
                // Ignore file read or parse errors for non-existent/malformed files
            }
        }

        return false;
    }

    private static async readSeriesFile(): Promise<SeriesJsonStructure> {
        try {
            const data = await fs.readFile(NEW_SERIES_FILE_PATH, 'utf-8');
            const parsed = JSON.parse(data);
            return { series: Array.isArray(parsed.series) ? parsed.series : [] };
        } catch {
            return { series: [] };
        }
    }

    /**
     * Creates and appends a new series object to new-series.json
     */
    public static async saveSeries(
        formData: SeriesFormValues
    ): Promise<Series> {
        const now = new Date().toISOString();
        const uniqueId = `ser_${ulid()}`;

        const newSeries: Series = {
            uniqueId,
            slug: formData.slug,
            title: formData.title,
            description: formData.description,
            defaultTags: formData.defaultTags || [],
            coverImage: formData.coverImage || 'https://cdn.example.com/series/covers/default-series.webp',
            coverAltText: formData.coverAltText || `${formData.title} cover image`,
            thumbnailImage: formData.thumbnailImage || 'https://cdn.example.com/series/thumbnails/default-series.webp',
            thumbnailAltText: formData.thumbnailAltText || `${formData.title} thumbnail image`,
            seoTitle: formData.seoTitle || formData.title,
            seoDescription: formData.seoDescription || formData.description,
            canonicalUrl: formData.canonicalUrl || null,
            inboundReferencingIds: [],
            createdAt: now,
            updatedAt: now,
        };

        const fileContent = await this.readSeriesFile();

        fileContent.series.unshift(newSeries);

        await fs.writeFile(
            NEW_SERIES_FILE_PATH,
            JSON.stringify(fileContent, null, 2),
            'utf-8'
        );

        return newSeries;
    }
}