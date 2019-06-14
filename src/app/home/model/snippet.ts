import { Thumbnails } from "./thumbnails";

export class Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    title: string;

    constructor(channelId: string, channelTitle: string, description: string,
        publishedAt: string, thumbnails: Thumbnails, title: string) {
            this.channelId = channelId;
            this.channelTitle = channelTitle;
            this.description = description;
            this.publishedAt = publishedAt;
            this.thumbnails = thumbnails;
            this.title = title;
        }
}