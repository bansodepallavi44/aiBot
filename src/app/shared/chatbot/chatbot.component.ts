import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  public videoConfig: any;
  public chatEnd: boolean = false;
  public chatWindowOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.videoConfig = {
      autoplay: false,
      controls: true,
      fluid: true,
      sources: [{ src: './../../../assets/images/video.mp4', type: 'video/mp4' }],
      poster: "./../../../assets/images/product-detail.jpg",
      playToggle: false
    };
  }

  /**
   * @name onChatWindowChange
   */
   public onChatWindowChange(value: boolean){
    this.chatWindowOpen = value;
  }

  /**
   * @name endChat
   */
  public endChat(){
    this.chatEnd = true;
  }

  /**
   * @name onStartChat
   */
  public onStartChat(){
    this.chatEnd = false;
  }

}
