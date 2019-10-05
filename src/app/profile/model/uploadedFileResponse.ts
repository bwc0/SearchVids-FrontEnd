export class UploadFileReponse {
    fileName: string;
    fileDownloadUri: string;
    fileType: string;
    size: number;
    userId: number;

    constructor(fileName: string, fileDownloadUri: string, fileType: string, size: number, userId: number) {
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
        this.userId = userId;
    }
}