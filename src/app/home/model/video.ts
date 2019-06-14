import { Id } from "./id";
import { Snippet } from "./snippet";

export class Video {
    etag: string;
    id: Id;
    snippet: Snippet;

    constructor(etag: string, id: Id, snippet: Snippet) {
        this.etag = etag;
        this.id = id;
        this.snippet = snippet;
    }
}