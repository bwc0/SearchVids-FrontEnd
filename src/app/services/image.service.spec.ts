import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UploadFileReponse } from '../profile/model/uploadedFileResponse';

describe('ImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ImageService]
  }));

  it('#should upload image', () => {

    let service: ImageService;
    let httpMock: HttpTestingController;

    service = TestBed.get(ImageService);
    httpMock = TestBed.get(HttpTestingController);

    let file = new File([], 'file');
    let uploadResponse = new UploadFileReponse(file.name, `${file.name}.txt`, 'text/plain', 9203, 1);

    service.uploadImage(1, file).subscribe(data => {
      expect(data.fileDownloadUri).toBe(uploadResponse.fileDownloadUri);
      expect(data.fileName).toBe(uploadResponse.fileName);
      expect(data.fileType).toBe(uploadResponse.fileType);
      expect(data.size).toBe(uploadResponse.size);
      expect(data.userId).toBe(uploadResponse.userId);
    });

    const req = httpMock.expectOne(`${service.url}1/image`);
    expect(req.request.method).toEqual('POST');

    req.flush(uploadResponse);

    httpMock.verify();
  });
});
