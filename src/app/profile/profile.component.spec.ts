import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from '../app.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MDBBootstrapModule.forRoot(), FlashMessagesModule.forRoot(), HttpClientTestingModule, FormsModule, 
        RouterTestingModule ],      
      declarations: [ ProfileComponent ],
      providers: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
