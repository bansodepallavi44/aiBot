import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { aiBotApiList } from '../aiBotApiList';
import { RESTAPI } from '../models/restAPI';
import { RestClient } from './rest-client';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  subscription: any;

  constructor(public router: Router, private rest: RestClient,protected cookieService: CookieService) {}
  ngOnInit() {}

  /**
   * @name call
   * @description calling rest client service and get subscribed data
   * @param  {string} apiKey
   * @param  {any} input
   * @param  {any} success?
   * @param  {any} failure?
   */
  public call(apiKey: string, input: any, success?: any, failure?: any) {
    // get api url, method & input from api list
    let apiRequestInput = aiBotApiList[apiKey];

    // create api object api data
    let api = new RESTAPI(apiRequestInput, input,this.cookieService);
    
    // calling rest client request api using rest client 
    this.rest.request(api.method(), api.url(), api.inputParams(), api.apiAuth())
      .subscribe(
        (response) => success(response),
        (error) => failure(error)
      );
  }

  
  /**
   * @name call
   * @description calling rest client service and get subscribed data
   * @param  {string} apiKey
   * @param  {any} input
   * @param  {any} success?
   * @param  {any} failure?
   */
   public callChat(apiKey: string, input: any, success?: any, failure?: any) {
    // get api url, method & input from api list
    let apiRequestInput = aiBotApiList[apiKey];

    // create api object api data
    let api = new RESTAPI(apiRequestInput, input,this.cookieService);
    
    // calling rest client request api using rest client 
    this.rest.request(api.method(), api.urlChat(), api.inputParams(), api.apiAuth())
      .subscribe(
        (response) => success(response),
        (error) => failure(error)
      );
  }

  /**
   * @name connectChat
   * @description calling rest client service and get subscribed data
   * @param  {string} apiKey
   * @param  {any} input
   * @param  {any} success?
   * @param  {any} failure?
   */
  public connectChat(apiKey: string, input: any, param: string, success?: any, failure?: any) {
    // get api url, method & input from api list
    let apiRequestInput = aiBotApiList[apiKey];

    // create api object api data
    let api = new RESTAPI(apiRequestInput, input,this.cookieService);
    
    // calling rest client request api using rest client 
    this.rest.request(api.method(), api.urlChatConnect(param), api.inputParams(), api.apiAuth())
      .subscribe(
        (response) => success(response),
        (error) => failure(error)
      );
  }
}
