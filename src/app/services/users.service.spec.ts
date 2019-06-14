import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Role, User, Video, RoleName } from '../profile/model/user';
import { AuthService } from './auth/auth.service';
import { ResponseMessage, ResponseMessageWithUser } from './response.message';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let roles: Role[];
  let roleName = RoleName.ROLE_USER;
  let role: Role;
  let video1: Video;
  let video2: Video;
  let videos: Video[];
  let dummyUser: User;
  let responseMessage: ResponseMessage;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UsersService]
  });

    service = TestBed.get(UsersService);
    httpMock = TestBed.get(HttpTestingController);

    role = new Role(1, roleName);
    roles = [role];

    video1 = new Video('videoId', 'videoTitle', 'published date', 'video description', 'video thumbnail', 'channelTitle');

    video2 = new Video('videoId2', 'videoTitle2', 'published date2', 'video description2', 'video thumbnail', 'channelTitle');

    videos = [video1, video2];

    dummyUser = new User('testusername', 'test@email.com', 'bigbyb', roles, videos);

    responseMessage = new ResponseMessageWithUser("User found with id: 1", "OK", dummyUser);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUserById', () => {
    it('should return observable<ResponseMessage>', () => {
      
      service.getUserById(1).subscribe(data => {
        expect(data.user.email).toBe('test@email.com');
        expect(data.user.username).toBe('testusername');
        expect(data.user.roles.length).toBe(1);
        expect(data.user.videos.length).toBe(2);
      });

      const req = httpMock.expectOne(`${service.url}1`);
      expect(req.request.method).toEqual('GET');
      
      req.flush(responseMessage);
    });
  });

    


});
