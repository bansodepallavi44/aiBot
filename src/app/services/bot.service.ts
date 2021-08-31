import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bot } from '../interfaces/bot';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  constructor(private http: HttpClient) {}

  /**
   * @name listOfBotInstances
   * @description show list of all bot instances
   * @param  {any} apiAuth
   */
  public listOfBotInstances(apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(
      `${environment.API_BASE_URL}/chat/show_all_bot_instances`,
      httpOptions
    );
  }

  /**
   * @name getWorkspaces
   * @description get workspace list
   * @param  {any} apiAuth
   */
  public getWorkspaces(apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(
      `${environment.API_BASE_URL}/chat/list_of_all_workspace_view`,
      httpOptions
    );
  }


  public createWorkSpace(input: FormData, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.post(
      `${environment.API_BASE_URL}/chat/create_workspace`,
      input,
      httpOptions
    );
  }

  deleteWorkSpace(apiAuth:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.delete(
      `${environment.API_BASE_URL}/chat/delete_workspace?id=${id}`,
      httpOptions
    );
  }

  /**
   * @name createBotInstance
   * @description creating bot instance with input
   * @param  {FormData} input
   * @param  {any} apiAuth
   */
  public createBotInstance(input: FormData, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.post(
      `${environment.API_BASE_URL}/chat/create_bot_instance_view`,
      input,
      httpOptions
    );
  }

  deleteBot(apiAuth:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.delete(
      `${environment.API_BASE_URL}/chat/delete_bot_instance?id=${id}`,
      httpOptions
    );
  }

  ///Store current bot id
  private botSource = new BehaviorSubject('');
  currentBot = this.botSource.asObservable();
  changeBot(id: string) {
    this.botSource.next(id);
  }

  /**
   * @param  {string} currentBot
   * @param  {any} apiAuth
   * @name showSecreteKey
   * @description get bot secrete key
   */
  public showSecreteKey(currentBot: string, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(`${environment.API_BASE_URL}/chat/show_bot_secret_setting_details?bot_name=`+currentBot, httpOptions);
  }
}
