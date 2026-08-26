import { SeriesCardData } from '../types/reference-card.type';

export const SERIES_BROADCAST_CHANNEL = 'series_creation_channel';

export interface SeriesCreatedMessage {
    type: 'SERIES_CREATED';
    payload: SeriesCardData;
}