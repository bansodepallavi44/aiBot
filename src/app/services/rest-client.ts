import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class RestClient {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  /**
   * @name request
   * @description calling the httpclient method and getting response in observable
   * @param  {string} method
   * @param  {string} url
   * @param  {any} params?
   * @param  {any} apiAuth?
   * @returns Observable
   */
  public request(method: string, url: string, params?: any, apiAuth?: any): Observable<any> {
    const httpOptions = {
      body: params,
      headers: new HttpHeaders({
         //TODO: when we are using input as JSON then we need enable this line
        // 'Content-Type': 'application/json',
        'Authorization': apiAuth,
      })
    };
    return this.http.request(method, url, httpOptions);
  }

  /**
   * @name get
   * @description get rest API
   * @param  {string} url
   * @param  {any} authHeaders?
   * @returns Observable
   */
  public get(url: string, authHeaders?: any): Observable<any> {
    return this.http.get(url, authHeaders);
  }
  
  /**
   * @name post
   * @description Post rest API
   * @param  {string} url
   * @param  {any} params
   * @param  {any} authHeaders?
   * @returns Observable
   */
  public post(url: string, params: any, authHeaders?: any): Observable<any> {
    return this.http.post(url, params, authHeaders);
  }

  
  /**
   * @name put
   * @description put rest API
   * @param  {string} url
   * @param  {any} params
   * @param  {any} authHeaders?
   * @returns Observable
   */
  public put(url: string, params: any, authHeaders?: any): Observable<any> {
    return this.http.put(url, params, authHeaders);
  }

  /**
   * @name delete
   * @description delete rest API
   * @param  {string} url
   * @param  {any} authHeaders?
   * @returns Observable
   */
  public delete(url: string, authHeaders?: any): Observable<any> {
    return this.http.delete(url, authHeaders);
  }
}
