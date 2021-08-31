import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { BotService } from 'src/app/services/bot.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-workspace-popup',
  templateUrl: './create-workspace-popup.component.html',
  styleUrls: ['./create-workspace-popup.component.scss']
})
export class CreateWorkspacePopupComponent implements OnInit {
  workSpaceForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private botService:BotService,
    private notifyService: NotificationService,
    public _dialogRef: MatDialogRef<CreateWorkspacePopupComponent>
  ) { }

  ngOnInit(): void {
    this.workSpaceForm = this.formBuilder.group({
      workspace:["",Validators.required]
    })
  }

  saveWorkSpace(){
    let formData = new FormData();
    formData.append('workspace',this.workSpaceForm.controls['workspace'].value)
    this.botService.createWorkSpace(formData,this.authService.apiAuth()).subscribe((res)=>{
      this.notifyService.tostMessage('success',"Workspace created")
      this._dialogRef.close(true)
    },(error)=>{
      this.notifyService.tostMessage('error',"Workspace not created")
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
