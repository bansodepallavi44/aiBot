import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bot } from 'src/app/interfaces/bot';
import { BotService } from 'src/app/services/bot.service';
import { CreateNewBotPopupComponent } from '../create-new-bot-popup/create-new-bot-popup.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-all-bots',
  templateUrl: './all-bots.component.html',
  styleUrls: ['./all-bots.component.scss'],
})
export class AllBotsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  bots: Array<Bot> = [];

  constructor(
    protected router: Router,
    private botService: BotService,
    private _dialog: MatDialog,
    private authService: AuthService,
    private notifyService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    //loading get bot instances on component creation
    this.getBotInstances();
  }
  
  /**
   * @name onCreateNewBot
   * @description open create new bot popup
   */
  public onCreateNewBot() {
    const dialogRef = this._dialog.open(CreateNewBotPopupComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBotInstances();
      }
    });
  }

  /**
   * @name getBotInstances
   * @description get all instances in list
   */
  public getBotInstances() {
    this.subscriptions.push(
      this.botService
        .listOfBotInstances(this.authService.apiAuth())
        .subscribe((response: any) => {
          this.bots = response.bots;
        })
    );
  }


  deleteBot(id: any) {
    Swal.fire({
      title: 'Want to delete?',
      html: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.value) {
        this.botService.deleteBot(this.authService.apiAuth(), id).subscribe((res) => {
          this.notifyService.tostMessage('success', "bot deleted");
          this.getBotInstances();
        })
      }
    })
  }

  botMenu(event: any) {
    event.stopPropagation()
  }

  trainBot(id: any, name: any) {
    this.botService.changeBot(name + "###" + id);
    //add login to remove space here
    this.router.navigate(['/admin/bot/training', name])
  }

  // unsubscribe to avoid memory leaks
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}