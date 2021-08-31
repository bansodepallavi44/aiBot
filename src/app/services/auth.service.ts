import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignUp } from '../interfaces/signUp';
import { Login } from '../interfaces/login';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private cookieService: CookieService) {}

  /**
   * @name signUp
   * @description sign up with user details
   * @param  {SignUp} signUp
   */
  public signUp(signUp: SignUp) {
    return this.http.post(`${environment.API_BASE_URL}/register/`, signUp);
  }

  /**
   * @name login
   * @description login with username and password
   * @param  {Login} login
   */
  public login(login: Login) {
    return this.http.post(`${environment.API_BASE_URL}/token/`, login);
  }

  /**
   * @name refreshToken
   * @description refresh token from old token
   * @param  {any} input
   */
  public refreshToken(input: any) {
    return this.http.post(`${environment.API_BASE_URL}/token/refresh/`, input);
  }

  public isLogin(): boolean {
    //console.log("Token test ",this.cookieService.get('access') ,this.cookieService.get('refresh'),this.cookieService.get('access') && this.cookieService.get('refresh'))
    if(this.cookieService.get('access')!="" && this.cookieService.get('refresh')!=""){
      return true
    }else{
      return false
    }
  }

  public apiAuth(): string {
    let authToken = this.cookieService.get('access')//localStorage.getItem('access');
    return `Bearer ${authToken}`;
  }
}
