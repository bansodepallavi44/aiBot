import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Utils } from '../helpers/utils';

export class RESTAPI {
  apiRequestInput: any;
  userInput: any;

  constructor(
    apiRequestInput: any, userInput: any,
    protected cookieService: CookieService) {
    this.apiRequestInput = apiRequestInput;
    this.userInput = userInput;
  }

  /**
   * @name method
   * @description return api method
   * @returns string
   */
  public method(): string {
    return this.apiRequestInput.method;
  }

  /**
   * @name url
   * @description return api url
   * @returns string
   */
  public url(): string {
    let url = environment.API_BASE_URL + this.apiRequestInput.url;
    return Utils.createUrl(url, this.userInput).toString();
  }

   /**
   * @name url
   * @description return api url
   * @returns string
   */
    public urlChat(): string {
      let url = environment.API_BASE_URL_CHAT + this.apiRequestInput.url;
      return Utils.createUrl(url, this.userInput).toString();
    }
  
    public urlChatConnect(params: string): string {
      let url = environment.API_BASE_URL_CHAT + this.apiRequestInput.url+params;
      return Utils.createUrl(url, this.userInput).toString();
    }


  /**
   * @name inputParams
   * @description return final api input JSON
   * @returns any
   */
  public inputParams(): any {
    // return Utils.createRequestJSON(this.apiRequestInput, this.userInput);
    return this.userInput;
  }

  /**
   * @name apiAuth
   * @description get auth token
   * @returns string
   */
  public apiAuth(): string {
    let authToken= this.cookieService.get('access')//localStorage.getItem('access');
    return `Bearer ${authToken}`;
  }
}
