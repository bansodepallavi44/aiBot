import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignUp } from '../interfaces/signUp';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  
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
  

  public logout(){
    
  }

  /**
   * @name refreshToken
   * @description refresh token from old token
   * @param  {any} input
   */
  public refreshToken(input: any) {
    return this.http.post(`${environment.API_BASE_URL}/token/refresh/`, input);
  }



  forgotPassword(postData:any) {
    return this.http.post(`${environment.API_BASE_URL}/reset_password`, postData);
  }
  resetPassword(postData:any,key1:string,key2:string) {
    return this.http.post(`${environment.API_BASE_URL}/reset_collaborator_password/${key1}/${key2}`, postData);
  }
}
