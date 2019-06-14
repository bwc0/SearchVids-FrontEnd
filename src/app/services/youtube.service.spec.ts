import { TestBed } from '@angular/core/testing';

import { YoutubeService } from './youtube.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Result } from '../home/model/result';
import { Video } from '../home/model/video';
import { Id } from '../home/model/id';
import { Snippet } from '../home/model/snippet';
import { Thumbnails, High } from '../home/model/thumbnails';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpMock: HttpTestingController;
  let items: Video[];
  let dummyResult: Result;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeService]
    });

    service = TestBed.get(YoutubeService);
    httpMock = TestBed.get(HttpTestingController);

    const video1 = new Video('video etag', new Id('video Id'),
      new Snippet('channel id', 'channel title', 'description', 'published at',
        new Thumbnails(new High('thumbnail url')), 'title'));

    const video2 = new Video('video etag2', new Id('video Id2'),
      new Snippet('channel id2', 'channel title2', 'description2', 'published at2',
        new Thumbnails(new High('thumbnail url2')), 'title2'));

    items = [video1, video2];

    dummyResult = new Result('result etag', items, 'nextpagetoken', 'prevpagetoken');
  });
  

  afterEach(() => {
    httpMock.verify();
  })

  describe('#search', () => {
    it('should return an Observable<Result>', () => {
    
      service.search('Chris Simms').subscribe(data => {
        expect(data.etag).toBe('result etag');
        expect(data.items.length).toBe(2);
        expect(data.nextPageToken).toBe('nextpagetoken');
        expect(data.prevPageToken).toBe('prevpagetoken');
      });

      const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${service.url}`);
      expect(req.request.params.has('q')).toBeTruthy();
      expect(req.request.params.get('part')).toBe('snippet, id');
      expect(req.request.params.get('q')).toBe('Chris Simms');
      expect(req.request.params.get('type')).toBe('video');
      expect(req.request.params.get('key')).toBe(`${service.key}`);
    
      req.flush(dummyResult);
    });
  });

  describe('#getNextAndPreviousPages', () => {
    it('should return an Observable<Result> with next token', () => {

      service.getNextAndPreviousPages('Chris Simms', dummyResult.nextPageToken).subscribe(data => {
        expect(data.etag).toBe('result etag');
        expect(data.items.length).toBe(2);
        expect(data.nextPageToken).toBe('nextpagetoken');
        expect(data.prevPageToken).toBe('prevpagetoken');
      });

      const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${service.url}`);
      expect(req.request.params.has('q')).toBeTruthy();
      expect(req.request.params.get('part')).toBe('snippet, id');
      expect(req.request.params.get('q')).toBe('Chris Simms');
      expect(req.request.params.get('pageToken')).toBe(dummyResult.nextPageToken);
      expect(req.request.params.get('type')).toBe('video');
      expect(req.request.params.get('key')).toBe(`${service.key}`);

      req.flush(dummyResult);
    });

    it('should return an Observable<Result> with previous token', () => {

      service.getNextAndPreviousPages('Chris Simms', dummyResult.prevPageToken).subscribe(data => {
        expect(data.etag).toBe('result etag');
        expect(data.items.length).toBe(2);
        expect(data.nextPageToken).toBe('nextpagetoken');
        expect(data.prevPageToken).toBe('prevpagetoken');
      });

      const req = httpMock.expectOne(req => req.method === 'GET' && req.url === `${service.url}`);
      expect(req.request.params.has('q')).toBeTruthy();
      expect(req.request.params.get('part')).toBe('snippet, id');
      expect(req.request.params.get('q')).toBe('Chris Simms');
      expect(req.request.params.get('pageToken')).toBe(dummyResult.prevPageToken);
      expect(req.request.params.get('type')).toBe('video');
      expect(req.request.params.get('key')).toBe(`${service.key}`);

      req.flush(dummyResult);
    });
  });
});