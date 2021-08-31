import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { BotService } from 'src/app/services/bot.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BotTrainingService } from '../bot-training.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: any;
  currentBot: any
  dummyList: any;
  constructor(private _botTrainingService: BotTrainingService,
    private activeRouter: ActivatedRoute,
    protected router: Router,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    protected notifyService: NotificationService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.activeRouter.params.subscribe((params) => {

      //this._botService.currentBot.subscribe((currentBot)=>{
      this.currentBot = params.name//currentBot.split("###")[0]
      this.getTrainData();
      //})
    });
    if (isPlatformBrowser(this._platformId)) {
      if (!this.cookieService.get('access')) {//localStorage.getItem('access')
        this.router.navigate(['/auth/login'])
      }
    }
  }
  getTrainData(end: any = 100, start: any = 0) {
    this._botTrainingService.getAllTrainData(this.authService.apiAuth(), this.currentBot, end, start).subscribe((res) => {
      this.questions = res;
      this.dummyList = res;
    }, (err) => {
      console.log("Error in training data service ", err)
    })
  }

  deleteTrainData(event: any, id: any) {
    event.stopPropagation()
    Swal.fire({
      title: 'Want to delete?',
      html: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.value) {
        if (id) {
          this._botTrainingService.deleteTrainData(this.authService.apiAuth(), id).subscribe((res) => {
            console.log("Response ", res)
            this.getTrainData();
          }, (err) => {
            console.log("Error in training data service ", err)
          })
        }
      }
    })

  }
  editTrainData(id: any) {
    this.router.navigate(['/admin/bot/training/' + this.currentBot + "/edit", id])
  }

  checkBoxClick(event: any) {
    event.stopPropagation();
  }

  checkBoxSelectAll(event: any) {
    console.log("kk")
  }

  searchQuestion(keyword: any) {
    if (keyword == "") {
      this.questions = this.dummyList
    } else {
      keyword = keyword.toLowerCase()
      this.questions = this.questions.filter((question: any) => {
        if (question['question'].toLowerCase().includes(keyword)
          || question['response'][0].toLowerCase().includes(keyword)) {
          return question;
        }
      })
    }
  }

  setEndLimit(endLimit: any) {
    this.getTrainData(endLimit)
  }
}
