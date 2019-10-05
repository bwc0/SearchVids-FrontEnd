import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Result } from './model/result';
import { YoutubeService } from '../services/youtube.service';
import { Video } from './model/video';
import { Video as UserVideo, User } from '../profile/model/user';
import { UsersService } from '../services/users.service';
import { TokenStorageService } from '../services/auth/token-storage/token-storage.service';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  query: string;
  result: Result;
  user: User;
  errorMessage = '';
  roles: string[];
  authority: string;

  @ViewChild('results') results: ElementRef;
  @ViewChild('favorites') favorites: ElementRef;

  constructor(private youtubeService: YoutubeService, private userService: UsersService, private authService: AuthService,
    private tokenStorage: TokenStorageService, private renderer: Renderer2, private app: AppComponent) { }

  ngOnInit() {
    this.app.checkIfAuthenticated();
    this.makeRequest();
  }

  onSubmit() {
    this.makeRequest();
  }

  private makeRequest() {
    this.clearResults();
    this.youtubeService.search(this.query).subscribe(data => this.result = data);
    this.showResults();
  }

  private displayVideoOutput(video: Video) {
    
    const column = this.renderer.createElement('div');
    this.renderer.addClass(column, 'col-md-4');
    this.renderer.addClass(column, 'videocolumn');
    this.renderer.appendChild(this.results.nativeElement, column);

    // Card
    const card = this.renderer.createElement('mdb-card');
    this.renderer.setAttribute(card, 'cascade', 'true');
    this.renderer.setAttribute(card, 'wider', 'true');
    this.renderer.addClass(card, 'card');
    this.renderer.addClass(card, 'card-cascade');
    this.renderer.addClass(card, 'wider');
    this.renderer.appendChild(column, card);

    // Card Image
    const cardImageDiv = this.renderer.createElement('div');
    this.renderer.addClass(cardImageDiv, 'view');
    this.renderer.addClass(cardImageDiv, 'view-cascade');
    this.renderer.addClass(cardImageDiv, 'overlay');
    this.renderer.addClass(cardImageDiv, 'waves-light');
    this.renderer.setAttribute(cardImageDiv, 'mdbWavesEffect', '');
    this.renderer.appendChild(card, cardImageDiv);

    const cardImage = this.renderer.createElement('mdb-card-img');
    this.renderer.setAttribute(cardImage, 'src', `${video.snippet.thumbnails.high.url}`);
    this.renderer.appendChild(cardImageDiv, cardImage);
    const image = this.renderer.createElement('img');
    this.renderer.addClass(image, 'img-fluid');
    this.renderer.setAttribute(image, 'src', `${video.snippet.thumbnails.high.url}`);
    this.renderer.appendChild(cardImage, image);

    const a = this.renderer.createElement('a');
    this.renderer.setAttribute(a, 'data-fancybox', '');
    this.renderer.setAttribute(a, 'data-type', 'iframe');
    this.renderer.setAttribute(a, 'data-src', `http://youtube.com/embed/${video.id.videoId}`);
    this.renderer.setAttribute(a, 'href', 'javascript:;');
    this.renderer.appendChild(cardImageDiv, a);
    const mask = this.renderer.createElement('div');
    this.renderer.addClass(mask, 'mask');
    this.renderer.addClass(mask, 'rgba-white-slight');
    this.renderer.appendChild(a, mask);

    // Card Content
    const cardbody = this.renderer.createElement('mdb-card-body');
    this.renderer.setAttribute(cardbody, 'cascade', 'true');
    this.renderer.addClass(cardbody, 'text-center');
    this.renderer.addClass(cardbody, 'card-body-cascade');
    this.renderer.addClass(cardbody, 'card-body');
    this.renderer.appendChild(card, cardbody);

    //Title
    const cardtitle = this.renderer.createElement('h4');
    this.renderer.addClass(cardtitle, 'card-title');
    this.renderer.appendChild(cardbody, cardtitle);

    const titlebold = this.renderer.createElement('strong');
    this.renderer.appendChild(cardtitle, titlebold);
    const videoTitle = this.renderer.createText(`${video.snippet.title}`);
    this.renderer.appendChild(titlebold, videoTitle);

    const cardsubtitle = this.renderer.createElement('h5');
    this.renderer.addClass(cardsubtitle, 'indigo-text');
    this.renderer.appendChild(cardbody, cardsubtitle);

    const subtitlebold = this.renderer.createElement('strong');
    this.renderer.appendChild(cardsubtitle, subtitlebold);
    const channeltitle = this.renderer.createText(`${video.snippet.channelTitle}`);
    this.renderer.appendChild(subtitlebold, channeltitle);

    // Description
    const carddescription = this.renderer.createElement('mdb-card-text');
    this.renderer.appendChild(cardbody, carddescription);
    const p = this.renderer.createElement('p');
    this.renderer.addClass(p, 'card-text');
    this.renderer.appendChild(carddescription, p);
    const description = this.renderer.createText(`${video.snippet.description}`);
    this.renderer.appendChild(p, description);

    // Favorite
    if (this.authService.isAuthenticated()) {
      let favVideo = new UserVideo(video.id.videoId, video.snippet.title, video.snippet.publishedAt,
        video.snippet.description, video.snippet.thumbnails.high.url, video.snippet.channelTitle);

      const addVideoLink = this.renderer.createElement('button');
      this.renderer.appendChild(cardbody, addVideoLink);
      this.renderer.setAttribute(addVideoLink, 'type', 'button');
      this.renderer.setAttribute(addVideoLink, 'mdbWavesEffect', '');
      this.renderer.addClass(addVideoLink, 'mt-2');
      this.renderer.addClass(addVideoLink, 'btn');
      this.renderer.addClass(addVideoLink, 'btn-floating');
      this.renderer.addClass(addVideoLink, 'btn-small');
      this.renderer.addClass(addVideoLink, 'waves-light');
      const addTextLink = this.renderer.createText('Add To Favorites');
      this.renderer.listen(addVideoLink, 'click', () => {
        this.addPrivateVideoRequest(favVideo);
        this.renderer.setAttribute(addVideoLink, 'disabled', '');
      });
      this.renderer.appendChild(addVideoLink, addTextLink);
    }
  }

  private addPrivateVideoRequest(videoToBeAdded: UserVideo) {
    let id = this.tokenStorage.getId();

    this.userService.addVideoToFavorites(+id, videoToBeAdded).subscribe(data => {
      this.app.flashMessage(`${data.message}`, 'alert-success', 3000);
    });
  }

  private checkNextAndPreviousPage(token: string) {
    this.youtubeService.getNextAndPreviousPages(this.query, token)
      .subscribe(data => this.result = data, error => this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`);
  }

  private createButtonDiv() {

    if (document.getElementById('mainbuttondiv') === null) {

      const mainButtonDiv = this.renderer.createElement('div');
      this.renderer.addClass(mainButtonDiv, 'col-md-4');
      this.renderer.setAttribute(mainButtonDiv, 'id', 'mainbuttondiv');
      this.renderer.appendChild(this.results.nativeElement, mainButtonDiv);

      return mainButtonDiv;
    }

    return document.getElementById('mainbuttondiv');
  }

  private createButton(token: string, id: string, fontAwesomeArrowDirection: string, x: () => void) {
    const buttondiv = this.renderer.createElement('div');
    this.renderer.setAttribute(buttondiv, 'id', id);
    this.renderer.setAttribute(buttondiv, 'appPagesButton', '');
    this.renderer.appendChild(this.createButtonDiv(), buttondiv);

    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'btn');
    this.renderer.setAttribute(button, 'data-token', token);
    this.renderer.setAttribute(button, 'data-query', this.query);
    this.renderer.listen(button, 'click', x);
    this.renderer.appendChild(buttondiv, button);

    const arrow = this.renderer.createElement('i');
    this.renderer.addClass(arrow, 'fas');
    this.renderer.addClass(arrow, fontAwesomeArrowDirection);
    this.renderer.setAttribute(arrow, 'aria-hidden', 'true');
    this.renderer.appendChild(button, arrow);
  }

  private nextPage() {
    this.clearResults();

    this.checkNextAndPreviousPage(this.result.nextPageToken);

    this.showResults();
  }

  private prevPage() {
    this.clearResults();

    this.checkNextAndPreviousPage(this.result.prevPageToken);

    this.showResults();
  }

  private displayButtons(prevPageToken: string, nextPageToken: string) {
    if (!prevPageToken) {
      this.createButton(nextPageToken, 'next', 'fa-angle-right', () => this.nextPage());
    } else {
      this.createButton(prevPageToken, 'prev', 'fa-angle-left', () => this.prevPage());
      this.createButton(nextPageToken, 'next', 'fa-angle-right', () => this.nextPage());
    }
  }

  private clearResults() {
    Array.from(this.results.nativeElement.children).forEach(child => {
      this.renderer.removeChild(this.results.nativeElement, child);
    });
  }

  private showResults() {
    setTimeout(() => {
      this.result.items.forEach(video => {
        // decode html entities
        video.snippet.title = this.decode(video.snippet.title);
        this.displayVideoOutput(video);
      });
      this.displayButtons(this.result.prevPageToken, this.result.nextPageToken);
    }, 1000);
  }

  private decode(str): string {
  return str.replace(/&#(\d+);/g, (match, dec) =>{
    return String.fromCharCode(dec);
    });
  }
}