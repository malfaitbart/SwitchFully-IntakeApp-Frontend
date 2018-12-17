import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { LoginComponent } from 'src/app/features/login/login.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedOnUser } from '../../User/classes/user';

describe('Component: Login', () => {

  let component: LoginComponent;
  let service: AuthService;
  let spy: any;
  let httpClient: HttpClient;
  let formBuilder: FormBuilder;
  let router: Router
  let route: ActivatedRoute;

  beforeEach(() => { 
    httpClient = ({ get: null, post: null } as unknown) as HttpClient;
    service = new AuthService(httpClient);
    component = new LoginComponent(formBuilder, route, router, service);
  })

  afterEach(() => { 
    service = null;
    component = null;
  });

  let user: LoggedOnUser = {
    id: '5',
    firstName: 'lars',
    lastName: 'peelman',
    email: 'test@test.be',
    lastLogon: new Date()
  };



});