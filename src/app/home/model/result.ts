import { Video } from "./video";

export class Result {
    etag: string;
    items: Video[];
    nextPageToken: string;
    prevPageToken: string;

    constructor(etag: string, items: Video[], nextPageToken:string,
        prevPageToken: string) {
            this.etag = etag;
            this.items = items;
            this.nextPageToken = nextPageToken;
            this.prevPageToken = prevPageToken;
        
    }
}

