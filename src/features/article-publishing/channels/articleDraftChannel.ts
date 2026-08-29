export type DraftEventType = 'DRAFT_UPDATED' | 'ARTICLE_PUBLISHED';

export interface DraftEventPayload {
    type: DraftEventType;
    articleId: string;
    slug?: string;
    seriesId?: string | null;
}

const CHANNEL_NAME = 'article_draft_sync_channel';

class ArticleDraftChannel {
    private channel: BroadcastChannel | null = null;

    constructor() {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            this.channel = new BroadcastChannel(CHANNEL_NAME);
        }
    }

    public publish(event: DraftEventPayload): void {
        if (this.channel) {
            this.channel.postMessage(event);
        }
    }

    public subscribe(callback: (event: DraftEventPayload) => void): () => void {
        if (!this.channel) {
            return () => {};
        }

        const handler = (messageEvent: MessageEvent<DraftEventPayload>) => {
            callback(messageEvent.data);
        };

        this.channel.addEventListener('message', handler);

        return () => {
            this.channel?.removeEventListener('message', handler);
        };
    }

    public close(): void {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
    }
}

export const articleDraftChannel = new ArticleDraftChannel();