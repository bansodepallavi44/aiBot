import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BotTrainingService } from '../bot-training.service';
import { CreateChildIntentPopupComponent } from '../create-child-intent-popup/create-child-intent-popup.component';

@Component({
  selector: 'app-bot-flow-chart',
  templateUrl: './bot-flow-chart.component.html',
  styleUrls: ['./bot-flow-chart.component.scss'],
})
export class BotFlowChartComponent implements OnInit {
  @Input() parentSaved: any;
  @Output() editIntent: EventEmitter<any> = new EventEmitter()
  intentList: any = [];
  parentQuestionIdList: any = [];
  constructor(private _dialog: MatDialog,
    private botTrainingService: BotTrainingService,
    private activeRoute: ActivatedRoute) { }

  currentBot: any
  ngOnInit(): void {
    this.activeRoute.params
      .subscribe((params) => {
        this.currentBot = params['name']
        if (params.id != undefined) {
          this.currentBot = params.name;
          this.parentQuestionIdList.push(params.id)
        }
      });
    this.botTrainingService.intentListSubject.subscribe((list) => {
      this.intentList = list;
    })
    console.log("Current bot in flow ", this.currentBot)
  }

  onAddChildIntent() {
    const dialogRef = this._dialog.open(CreateChildIntentPopupComponent, {
      width: '500px',
      autoFocus: false,
      data: { "currentBot": this.currentBot }
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log("Go ",result)
    });
  }

  goParentQuestion() {
    if (this.parentQuestionIdList.length > 1) {
      this.editIntent.emit(this.parentQuestionIdList[this.parentQuestionIdList.length - 2]);
      this.parentQuestionIdList.pop()
    } else {
    }
  }

  remove(event: any, index: any) {
    event.stopPropagation();  
    Swal.fire({
      title: 'Want to delete?',
      html: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.value) {
    this.botTrainingService.removeIntent(index)
      }
    })
  }

  editIntentHandler(id: any) {
    this.parentQuestionIdList.push(id);
    this.editIntent.emit(id);
  }


}
