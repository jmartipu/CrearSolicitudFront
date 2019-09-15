import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { sign } from "fake-jwt-sign";
import * as decode from 'jwt-decode';
import {BehaviorSubject, from, Observable, of, throwError as observableThrowError} from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import {CacheService} from "../cache/cache.service";
import {transformError} from "../common/common";
import {ISolicitudes} from "../interfaces";
import {getToken} from "codelyzer/angular/styles/cssLexer";


@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService implements IAuthService{
  username: string;
  httpOptions;
  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  );

  private readonly authProvider: (
    username: string,
    password: string
  ) => Observable<IServerAuthResponse>;

  constructor(private httpClient: HttpClient) {
    super();
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus))
    this.authProvider = this.djangoAuthProvider
  }

  login(username: string, password: string):Observable<IAuthStatus> {
    this.logout();
    const loginResponse = this.authProvider(username, password).pipe(
      map(value => {
        this.setToken(value.accessToken);
        return decode(value.accessToken) as IAuthStatus
      }),
      catchError(transformError)
    );
    loginResponse.subscribe(
      res => {
        this.authStatus.next(res)
      },
      err => {
        this.logout();
        return observableThrowError(err)
      }
    );
    return loginResponse
  }

  logout(){
    this.clearToken();
    this.authStatus.next(defaultAuthStatus)
  }

  private djangoAuthProvider(
    username: string,
    password: string
  ): Observable<IServerAuthResponse>{
    this.httpClient.post(`${environment.baseUrl}${environment.targetSolicitudesServer}:${environment.targetSolicitudesPort}${environment.targetapiToken}`,
      `{"username": "${username}", "password": "${password}"}`,this.httpOptions).subscribe(
      data => {

        this.username = username;
        this.setToken(data['token'])

      }
    )
    const authStatus = {
      isAuthenticated: true,
      username: this.username,
    } as IAuthStatus;

    const authResponse = {
      accessToken: this.getToken()
    } as IServerAuthResponse;

    return of(authResponse)
  }

  // private fakeAuthProvider(
  //   username: string,
  //   password: string
  // ): Observable<IServerAuthResponse>{
  //   if(!username.toLowerCase().endsWith('@test.com')){
  //     return observableThrowError(
  //       'Fallo Login'
  //     )
  //   }
  //
  //   const authStatus = {
  //     isAuthenticated: true,
  //     username: 'e4d1bc2ab25c',
  //   } as IAuthStatus;
  //
  //   const authResponse = {
  //     accessToken: sign(authStatus, 'secret', {
  //       expiresIn: '1h',
  //       algorithm: 'none',
  //     }),
  //   } as IServerAuthResponse;
  //
  //   return of(authResponse)
  // }

  private setToken(jwt: string){
    this.setItem('jwt',jwt)
  }

  private getDecodedToken():IAuthStatus{
    return decode(this.getItem('jwt'))
  }

  getToken():string{
    return this.getItem('jwt') || ''
  }

  private clearToken(){
    this.removeItem('jwt')
  }
  isAuthenticated()
  {
    if(!this.username){
      return false
    }
    return true
  }
}
export interface IAuthStatus {
  isAuthenticated: boolean
  username: string
}

interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus = {
  isAuthenticated: false,
  username: null
}

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>
  login(username: string, password:string): Observable<IAuthStatus>
  logout()
  getToken(): string
  username: string
}


