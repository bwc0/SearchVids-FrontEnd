import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Role, User, Video, RoleName } from '../profile/model/user';
import { AuthService } from './auth/auth.service';
import { ResponseMessage, ResponseMessageWithUser } from './response.message';
import { UpdateFormInfo } from '../profile/model/updateFormInfo';

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
  let info: UpdateFormInfo;
  
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
    dummyUser.id = 1;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUserById', () => {

    it('should return observable<ResponseMessageWithUser>', () => {

      responseMessage = new ResponseMessageWithUser("User found with id: 1", "OK", dummyUser);
      
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

  describe('#updateUserById', () => {
    
    it('should return Observable<ResponseMessageWithUser>', () => {

      info = new UpdateFormInfo('newUsername', 'newPassword');

      dummyUser.username = info.username;
      dummyUser.password = info.password;

      responseMessage = new ResponseMessageWithUser("User found with updated: 1", "OK", dummyUser);

      service.updateUserById(1, info).subscribe(data => {
        expect(data.message).toBe(responseMessage.message)
        expect(data.status).toBe(responseMessage.status)
        expect(data.user.username).toBe(info.username);
        expect(data.user.password).toBe(info.password);
      });

      const req = httpMock
        .expectOne(`${service.url}1`);

      expect(req.request.method).toEqual('PATCH');

      req.flush(responseMessage);

    });
  });

  describe('#addVideoToFavorites', () => {

    it('should add video to user favorites and then return ResponseMessageWithUser', () => {

      let video3 = new Video('videoId3', 'videoTitle3', 'published date3', 'video description3', 'video thumbnail3', 'channelTitle3');

      dummyUser.videos.push(video3);

      responseMessage = new ResponseMessageWithUser('Video removed from favorites', 'OK', dummyUser);

      service.addVideoToFavorites(1, video3).subscribe(data => {
        expect(data.message).toBe(responseMessage.message)
        expect(data.status).toBe(responseMessage.status);
        expect(data.user.videos.length).toBe(3);
      });

      const req = httpMock.expectOne(`${service.url}1`);

      expect(req.request.method).toEqual('POST');

      req.flush(responseMessage);

    });
  });

  describe('#removeVideoFromFavorites', () => {

    it('should remove video from user favorites and return ResponseMessage', () => {
      
      responseMessage = new ResponseMessage('Video removed from favorites', 'OK');

      service.removeVideo(1, video1.videoId).subscribe(data => {
        expect(data.message).toBe(responseMessage.message);
        expect(data.status).toBe(responseMessage.status);
      });

      const req = httpMock.expectOne(`${service.url}1/video/${video1.videoId}`);

      expect(req.request.method).toEqual('DELETE');

      req.flush(responseMessage);

    });
  });

  describe('#deleteUserProfile', () => {

    it('should delete user profile', () => {
      
      service.deleteProfile(1).subscribe();

      const req = httpMock.expectOne(`${service.url}1`);

      expect(req.request.method).toEqual('DELETE');

    });
  });
});