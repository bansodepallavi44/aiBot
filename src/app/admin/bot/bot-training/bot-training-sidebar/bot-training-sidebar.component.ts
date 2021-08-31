import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotService } from 'src/app/services/bot.service';

@Component({
  selector: 'app-bot-training-sidebar',
  templateUrl: './bot-training-sidebar.component.html',
  styleUrls: ['./bot-training-sidebar.component.scss']
})
export class BotTrainingSidebarComponent implements OnInit {
  
  currentBot:any;
  constructor(private _botService:BotService,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRouter.params.subscribe((params) => {
      // this.getTrainData();
      //this._botService.currentBot.subscribe((currentBot)=>{
        this.currentBot = params.name//urrentBot.split("###")[0]
     // })
    });
    // this._botService.currentBot.subscribe((currentBot)=>{
    //   this.currentBot = currentBot.split("###")[0]
    // })
  }

}
