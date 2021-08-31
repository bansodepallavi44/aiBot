import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BotTrainingService } from '../bot-training.service';

@Component({
  selector: 'app-create-child-intent-popup',
  templateUrl: './create-child-intent-popup.component.html',
  styleUrls: ['./create-child-intent-popup.component.scss'],
})
export class CreateChildIntentPopupComponent implements OnInit {
  intentForm:FormGroup
  constructor(public _dialogRef: MatDialogRef<CreateChildIntentPopupComponent>,
    private formBuilder:FormBuilder,
    private botTrainingService:BotTrainingService,
    private authService:AuthService,
    private activeRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ) {
    this.intentForm= this.formBuilder.group({
      "question": "#",
      "button_text":"#",
      "trigger":false,
      "key_words": [["#"]],
      "category": "#",
      "similar_questions": [['#']],
      "response": [["#"]],
      "response_type": "text",
      "channels": [["__all__"]],
      "bot_instance": "",
      "child_intent": [null] 
    });
  }

  
  ngOnInit(): void {}

  /**
   * @name closeDialog
   * @description close popup
   */
  public closeDialog(): void {
    this._dialogRef.close();
  }
  saveIntent(){
    this.intentForm.controls['bot_instance'].patchValue(this.data.currentBot)
    this.botTrainingService.addNewTrainData(this.authService.apiAuth(),this.intentForm.value).subscribe((res)=>{
      this.botTrainingService.addIntent(res)
    });
    this._dialogRef.close();
  }
}
