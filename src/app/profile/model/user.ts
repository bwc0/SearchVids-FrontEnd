export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    imageDetails: ImageDetails;
    roles: Role[];
    videos: Video[];

    constructor(username: string, email: string, password: string, roles: Role[],
        videos: Video[]) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.roles = roles;
            this.videos = videos;
        }
}

export class Role {
    id: number;
    name: RoleName;

    constructor(id: number, name: RoleName) {
        this.id = id;
        this.name = name;
    }
}

export class Video {
    videoId: string;
    title: string;
    publishedAt: string;
    description: string;
    thumbnail: string;
    channelTitle: string;

    constructor(videoId: string, title: string, publishedAt: string,
        description: string, thumbnail: string, channelTitle: string) {
            this.videoId = videoId;
            this.title = title;
            this.publishedAt = publishedAt;
            this.description = description;
            this.thumbnail = thumbnail;
            this.channelTitle = channelTitle;
        }
}

export enum RoleName {
    ROLE_USER 
}

export class ImageDetails {
    data: [];
    fileName: string;
    fileType: string;

    constructor(data: [], fileName: string, fileType: string) {
        this.data = data;
        this.fileName = fileName;
        this.fileType = fileType;
    }

}