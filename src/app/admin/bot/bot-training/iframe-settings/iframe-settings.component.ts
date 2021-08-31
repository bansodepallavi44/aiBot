import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IframeSetting } from 'src/app/interfaces/iframeSetting';
import { AuthService } from 'src/app/services/auth.service';
import { BotService } from 'src/app/services/bot.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-iframe-settings',
  templateUrl: './iframe-settings.component.html',
  styleUrls: ['./iframe-settings.component.scss'],
})
export class IframeSettingsComponent implements OnInit {
  currentBot: any;

  //model for iframe setting
  iframeSetting: IframeSetting = {
    bot_name: '',
    bot_type: undefined,
    company: undefined,
    secret_key: '',
    iframe: undefined,
  };

  constructor(
    private activeRouter: ActivatedRoute,
    private botService: BotService,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.currentBot = params.name;
    });
    this.showBotSecreteKey();
  }

  /**
   * @name showBotSecreteKey
   * @description getting Bot secrete key
   */
  public showBotSecreteKey() {
    this.botService
      .showSecreteKey(this.currentBot, this.authService.apiAuth())
      .subscribe((response: any) => {
        this.iframeSetting = response;
      });
  }
}