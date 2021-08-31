import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { BotTrainingService } from './bot-training.service';
import { BotService } from 'src/app/services/bot.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-bot-training',
  templateUrl: './bot-training.component.html',
  styleUrls: ['./bot-training.component.scss']
})
export class BotTrainingComponent  implements OnInit {
  questions: any;
  currentBot:any
  constructor() {}

  ngOnInit(): void {

  }
 
}
