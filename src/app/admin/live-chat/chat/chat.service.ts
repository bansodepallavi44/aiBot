import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';
import { Message } from '../../../interfaces/message'
import { environment } from "src/environments/environment";

@Injectable()
export class ChatService {
  public messages: Subject<Message>;
  url: string = '';

  constructor(private wsService: WebsocketService) {


  }
  public close() {
    //console.log('on closing WS');
    this.wsService.close();
  }

  serviceCalled() {
    let completeURL = environment.completeUrl + '/ws/chat/' + this.url;
    // console.log("Hi this is socket URL ", completeURL)
    this.messages = <Subject<Message>>this.wsService.connect(completeURL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data).message;
        return data;
      }
    ));
  }
}