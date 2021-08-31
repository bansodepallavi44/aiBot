import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateBot } from 'src/app/interfaces/createBot';
import { Workspace } from 'src/app/interfaces/workspace';
import { AuthService } from 'src/app/services/auth.service';

import { BotService } from 'src/app/services/bot.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-new-bot-popup',
  templateUrl: './create-new-bot-popup.component.html',
  styleUrls: ['./create-new-bot-popup.component.scss']
})
export class CreateNewBotPopupComponent  implements OnInit {
  createBotForm:FormGroup;
  workSpaceList:any=[]
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private botService: BotService,
    private authService:AuthService,
    protected notifyService: NotificationService,
    public _dialogRef: MatDialogRef<CreateNewBotPopupComponent>
  ) {
    
  }

  ngOnInit(): void {
    this.createBotForm = this.formBuilder.group({
      bot_name:["",Validators.required],
      bot_type:["",Validators.required]
    })

    this.botService.getWorkspaces(this.authService.apiAuth()).subscribe((res)=>{
      this.workSpaceList = res;
    })
  }

saveBot(){
  let formData = new FormData();
  formData.append('bot_name',this.createBotForm.controls['bot_name'].value);
  formData.append('bot_type',this.createBotForm.controls['bot_type'].value);
  this.botService.createBotInstance(formData,this.authService.apiAuth()).subscribe((res)=>{
    this._dialogRef.close(true);
    this.notifyService.tostMessage('success','Bot Created')
  },(error)=>{
    this.notifyService.tostMessage('error','Bot Not Created')
  })
}

  /**
   * @name closeDialog
   * @description close popup
   */
  public closeDialog(): void {
    this._dialogRef.close(false);
  }
}
