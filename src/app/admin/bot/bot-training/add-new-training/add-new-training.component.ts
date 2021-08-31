import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BotTrainingService } from 'src/app/admin/bot/bot-training/bot-training.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-new-training',
  templateUrl: './add-new-training.component.html',
  styleUrls: ['./add-new-training.component.scss']
})
export class AddNewTrainingComponent implements OnInit {
  panelOpenState = false;
  htmlValue: any = "";
  chipTextDefault = "";
  keyWords: any = []
  tabSelectedIndex = 0;
  saved: any = false;
  trainingForm: FormGroup;
  defaultFormValues = {
    "trigger": false,
    "response_type": "text",
    "channels": ["__all__"],
  }
  constructor(private formBuilder: FormBuilder,
    private botTrainingService: BotTrainingService,
    protected router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    protected notifyService: NotificationService) {


    this.trainingForm = this.formBuilder.group({
      "question": ["", [Validators.required]],
      "button_text": [""],
      "trigger": [false, [Validators.required]],
      "key_words": [""],
      "category": ["", [Validators.required]],
      "similar_questions": [""],
      "similar_questions_1": this.formBuilder.array([this.newSimilarQuestion('')]),
      "response": ["", [Validators.required]],
      "response_type": ["text", [Validators.required]],
      "channels": [["__all__"], [Validators.required]],
      "bot_instance": [""],
      "child_intent": [null]
    })
  }




  newSimilarQuestion(data: any): FormGroup {
    return this.formBuilder.group({
      question: [data]
    })
  }

  get similarQuestionsArray(): FormArray {
    return this.trainingForm.get("similar_questions_1") as FormArray
  }

  similarQuestions: any = [];
  questionId: any;
  currentBot: any
  ngOnInit(): void {
    this.activeRoute.params
      .subscribe((params) => {
        this.currentBot = params['name']
        if (params.id != undefined) {
          this.questionId = params.id;
          this.currentBot = params.name;
          this.getSingleTrainData(this.questionId);
        }
      });

    if (this.questionId != undefined || this.questionId != "") {
      this.saved = true;
      this.botTrainingService.addIntent([], true)
    }

    this.botTrainingService.responseSubject.subscribe((value) => {
      this.htmlValue = value
    })
  }



  remove(index: any) {
    Swal.fire({
      title: 'Want to delete?',
      html: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.value) {
        this.similarQuestionsArray.removeAt(index);
      }
    })
  }
  removeKeyword(index: any) {
    this.keyWords.splice(index, 1)
  }

  addSimilarQuestion(data: string) {
    this.similarQuestionsArray.push(this.newSimilarQuestion(data));
  }

  onTabChanged($event: any) {
    this.trainingForm.controls['response_type'].patchValue($event.tab.textLabel.toLowerCase())
  }

  addKeyWord(event: any) {
    this.keyWords.push(event.target.value)
  }


  textChangedHandler(value: any) {
    this.trainingForm.controls['response'].patchValue(value);
  }


  saveBot(): any {
    this.botTrainingService.intentListSubject.subscribe((intentList) => {
      let intentsId = intentList.map((list) => { return list['id'] })
      if (intentsId.length > 0) {
        this.trainingForm.controls['child_intent'].patchValue(intentsId)
      }

    })
    if (this.trainingForm.invalid) {
      Object.keys(this.trainingForm.controls).forEach(key => {

        const controlErrors: ValidationErrors = this.trainingForm.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
      this.fail("Please fill form to save")
      return false
    }

    this.trainingForm.controls['response'].patchValue([this.trainingForm.controls['response'].value])
    this.trainingForm.controls['key_words'].patchValue(this.keyWords);
    this.trainingForm.controls['bot_instance'].patchValue(this.currentBot);
    let tempList = this.similarQuestionsArray.value.map((e: any) => { return e['question'] })
    this.trainingForm.controls['similar_questions'].patchValue(tempList)

    if (this.questionId != undefined) {
      this.botTrainingService.editTrainData(this.authService.apiAuth(), this.trainingForm.value).subscribe((res) => {
        this.saved = true
        this.success("Question Updated")
        this.trainingForm.reset(this.defaultFormValues);
        this.keyWords = []
      }, (error) => {
        this.saved = false
        this.fail(error.statusText)
      })
    } else {
      this.botTrainingService.addNewTrainData(this.authService.apiAuth(), this.trainingForm.value).subscribe((res) => {
        this.saved = true;
        this.botTrainingService.addIntent(res)
        this.success("Question saved")
        this.trainingForm.reset(this.defaultFormValues);
        this.keyWords = [];
      }, (error) => {
        this.saved = false
        this.fail(error.statusText)
      })
    }

  }

  getSingleTrainData(id: any) {
    this.trainingForm.addControl('id', new FormControl(''));
    this.similarQuestionsArray.clear();
    this.botTrainingService.getSingleTrainData(this.authService.apiAuth(), id).subscribe((res: any) => {
      this.keyWords = res['key_words'];
      this.botTrainingService.changeResponse(res['response'][0])
      this.trainingForm.controls['similar_questions_1'].patchValue(res['similar_questions'].map((e: any, i: any) => {
        if (i < res['similar_questions'].length) {
          this.addSimilarQuestion('')
        }
        return { 'question': e }
      }))
      this.trainingForm.patchValue(res);
      //this.htmlValue=res['response'][0]
      this.trainingForm.controls['response'].patchValue(res['response'][0]);
      this.addIntentList(res['child_intent'])
    }, (error) => {
      this.fail(error.statusText)
    })
  }

  addIntentList(child_intent: any) {
    //console.log("Demo ",child_intent)
    if (child_intent != null && child_intent.length > 0) {
      this.botTrainingService.addIntent([], true)
      child_intent.forEach((element: any) => {
        this.botTrainingService.addIntent(element)
      });
    } else {
      this.botTrainingService.addIntent([], true)
    }
  }

  public success(response: any) {
    this.notifyService.tostMessage('success', response);
  }

  public fail(error: any) {
    this.notifyService.tostMessage('warning', error);
  }

  editIntentParentHandler(id: any) {
    this.getSingleTrainData(id);
    this.addIntentList(this.trainingForm.controls['child_intent'])
  }

  autoAddSimilarQuestion() {
    this.botTrainingService.getSimilarQuestions(this.authService.apiAuth(), this.trainingForm.controls['question'].value).subscribe((res: any) => {
      this.similarQuestionsArray.clear()
      this.trainingForm.controls['similar_questions_1'].patchValue(res['similar_question'].map((e: any, i: any) => {
        if (i < res['similar_question'].length) {
          this.addSimilarQuestion('')
        }
        return { 'question': e }
      }))
    }, (error) => {
      this.fail(error.statusText)
    })
  }
}
