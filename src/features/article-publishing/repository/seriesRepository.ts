import fs from 'fs/promises';
import path from 'path';
import { ulid } from 'ulid';
import type { SeriesFormValues } from '../schemas/seriesFormSchema';

const NEW_SERIES_FILE_PATH = path.join(
    process.cwd(),
    'src/mock-files/new-series.json'
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
    public static async isSlugExists(slug: string): Promise<boolean> {
        const paths = [NEW_SERIES_FILE_PATH];
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
                // Ignore file read or parse errors
            }
        }

        return false;
    }

    private static async readSeriesFile(filePath = NEW_SERIES_FILE_PATH): Promise<SeriesJsonStructure> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const parsed = JSON.parse(data);
            return { series: Array.isArray(parsed.series) ? parsed.series : [] };
        } catch {
            return { series: [] };
        }
    }

    private static async writeSeriesFile(filePath: string, data: SeriesJsonStructure): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

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

        const fileContent = await this.readSeriesFile(NEW_SERIES_FILE_PATH);

        fileContent.series.unshift(newSeries);

        await this.writeSeriesFile(NEW_SERIES_FILE_PATH, fileContent);

        return newSeries;
    }

    public static async getInboundReferences(targetSeriesId: string): Promise<string[]> {
        const paths = [NEW_SERIES_FILE_PATH];
        for (const filePath of paths) {
            const data = await this.readSeriesFile(filePath);
            const found = data.series.find((s) => s.uniqueId === targetSeriesId);
            if (found) {
                return found.inboundReferencingIds || [];
            }
        }
        return [];
    }

    public static async addInboundReference(targetSeriesId: string, sourceArticleId: string): Promise<void> {
        const paths = [NEW_SERIES_FILE_PATH];
        for (const filePath of paths) {
            const data = await this.readSeriesFile(filePath);
            const index = data.series.findIndex((s) => s.uniqueId === targetSeriesId);
            if (index !== -1) {
                const item = data.series[index];
                const currentRefs = item.inboundReferencingIds || [];
                if (!currentRefs.includes(sourceArticleId)) {
                    item.inboundReferencingIds = [...currentRefs, sourceArticleId];
                    item.updatedAt = new Date().toISOString();
                    await this.writeSeriesFile(filePath, data);
                }
                return;
            }
        }
    }

    public static async removeInboundReference(targetSeriesId: string, sourceArticleId: string): Promise<void> {
        const paths = [NEW_SERIES_FILE_PATH];
        for (const filePath of paths) {
            const data = await this.readSeriesFile(filePath);
            const index = data.series.findIndex((s) => s.uniqueId === targetSeriesId);
            if (index !== -1) {
                const item = data.series[index];
                const currentRefs = item.inboundReferencingIds || [];
                if (currentRefs.includes(sourceArticleId)) {
                    item.inboundReferencingIds = currentRefs.filter((id) => id !== sourceArticleId);
                    item.updatedAt = new Date().toISOString();
                    await this.writeSeriesFile(filePath, data);
                }
                return;
            }
        }
    }
}