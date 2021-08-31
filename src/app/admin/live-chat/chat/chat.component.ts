import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { interval, Subscription, Observable, Observer} from 'rxjs';
import { ChatService } from './chat.service';
import { webSocket } from "rxjs/webSocket";
import { DomSanitizer } from '@angular/platform-browser';
import { map, catchError, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public isWaitingWindowActive: boolean = false;
  public isUserDescriptionActive: boolean = false;
  waitingUsers: any = [];
  chatList: any = [];
  mySubscription: Subscription;
  dynamiclinking: string;
  message: any = '';
  sentMessage: any = '';

  staleFromMsg: any = [];
  staleToMsg: any = [];
  staleMsgList:any=[
    
  ]
  detailRecivedSubscription: Subscription;
  newReceivedMsg: any = '';
  newSentMsg: any = '';

  partialString: string = '';


  constructor(public dataService: DataService,
    private spinner: NgxSpinnerService,
     private chatService: ChatService,public sanitizer: DomSanitizer) {
  }
  

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.sentMessage = this.message;
    this.chatService.messages.next({'message':this.message});
    this.message = "";
  }

  ngOnInit(): void {
    this.mySubscription = interval(5000).subscribe((x =>{
      this.dataService.callChat(
        'agentWaitList',
        {},
        (response: any) => this.successResponse(response,'waitList'),
        (error: any) => this.failedResponse(error.error, 'waitList')
      );
      this.dataService.callChat(
        'agentChatList',
        {},
        (response: any) => this.successResponse(response,'chatList'),
        (error: any) => this.failedResponse(error.error, 'chatList')
      );
    }));
  }

  selectChat(link: string, switchedBot?: string) {
    this.spinner.show()
    if (this.partialString != '') {
      this.detailRecivedSubscription.unsubscribe();
      this.chatService.messages.unsubscribe();
      this.chatService.url = '';
    }
    let firstSplit = link.split('/');
    let botName = firstSplit[4];
    let botSecretkey = firstSplit[5];
    let chatRoom = firstSplit[6];
    let secondSplit = firstSplit[7].split('=');
    let botAgent = secondSplit[1];
    this.partialString = botName+'/'+botSecretkey+'/'+chatRoom+'/?'+botAgent;
    this.chatService.url = this.partialString;
    this.chatService.serviceCalled();
    // this.staleFromMsg = [];
    // this.staleToMsg = []
    this.staleMsgList = []
    this.detailRecivedSubscription = this.chatService.messages.subscribe((e: any) => {
      const messageList = JSON.parse(e);
      if(Array.isArray(messageList)){
        //console.log("IN array loop")
        messageList.forEach((tempMessage:any)=>{
          this.staleMsgList.push({'from':tempMessage["From"],'msg':tempMessage["text"],'date':tempMessage['timestamp']});
          // AAA
        })
      }else{
        //console.log("no in array loop")
        this.staleMsgList.push({'from':messageList["From"],'msg':messageList["text"],'date':messageList ['timestamp']});
        // BBB
      }
      //console.log("Msg List ",JSON.parse(e))
      this.spinner.hide();
    });
  }


  successResponse(response: any, responseType: any) {
    //console.log('SUCCESSFUL API call', response);
    switch (responseType) {
      case 'waitList':
        console.log("waiting List -- ", response)
        this.waitingUsers = response;
        break;
      case 'chatList':
        console.log("chat list -- ", response)
        this.chatList = response;
        break;
    
      default:
        break;
    }
    // this.mySubscription.unsubscribe();
  }

  failedResponse(errorResponse: any, responseType: any) {
    console.log('FAILED API call', errorResponse);
  }

  acceptAgent(conversationID: any) {
    this.dataService.connectChat(
      'connectAgentWithUser',
      {},
      conversationID,
      (response: any) => {
        console.log('THIS IS SUCCESSS', response);
        
      },
      (error: any) => {
        console.log('THIS IS failure', error);

      }
    )
  }

  deleteChat(conversationID: any) {
    //event.stopPrapogation();
    this.dataService.connectChat(
      'leaveAgentFromUser',
      {},
      conversationID,
      (response: any) => {
        console.log('THIS IS SUCCESSS', response);
        
      },
      (error: any) => {
        console.log('THIS IS failure', error);

      }
    )
  }


  public onTabChange(){
    this.isWaitingWindowActive = !this.isWaitingWindowActive;
  }

  public onUserDescriptionChange(){
    this.isUserDescriptionActive = !this.isUserDescriptionActive;
  }

}


// AAA 

// for (let i = 0; i < messages.length; i++) {
              // this.staleMsgList.push({'from':messages[i]["From"],'msg':messages[i]["text"],'date':''})
              // // console.log(messages[i])
              // if (messages[i]["From"] == 'User'){
              //     // this is recieved from bot 
              //     console.log("In 1",messages[i]["text"])
              //     this.staleFromMsg.push(messages[i]["text"]);
              // }else{
              //     // this is sent from bot 
              //     console.log("In 2",messages[i]["text"])
              //     this.staleToMsg.push(messages[i]["text"]);
              // }
          // }

// BBB

 // if (messages["From"] == 'User'){
          //     console.log("in main 3",messages["text"])
          //     this.newReceivedMsg = messages["text"];
          // }else{
          //   console.log("in main 4",messages["text"])
          //   this.staleToMsg.push(messages["text"]);
          //   this.newSentMsg = messages["text"];
          // }