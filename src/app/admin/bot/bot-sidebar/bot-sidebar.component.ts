import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { BotService } from 'src/app/services/bot.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';
import { CreateWorkspacePopupComponent } from '../create-workspace-popup/create-workspace-popup.component';

@Component({
  selector: 'app-bot-sidebar',
  templateUrl: './bot-sidebar.component.html',
  styleUrls: ['./bot-sidebar.component.scss']
})
export class BotSidebarComponent implements OnInit {
  workSpaceList: any = []
  constructor(
    private _dialog: MatDialog,
    private authService: AuthService,
    private botService: BotService,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getWorkSpaceList()
  }

  getWorkSpaceList() {
    this.botService.getWorkspaces(this.authService.apiAuth()).subscribe((res) => {
      this.workSpaceList = res
    })
  }

  deleteWorkSpace(event: any, id: any) {
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
        this.botService.deleteWorkSpace(this.authService.apiAuth(), id).subscribe((res) => {

          this.getWorkSpaceList();
        })
      }
    })
  }
  /**
  * @name onAddWorkspace
  * @description open create new bot popup
  */
  public onAddWorkspace() {
    const dialogRef = this._dialog.open(CreateWorkspacePopupComponent, {
      width: '500px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getWorkSpaceList()
      }
    });
  }

}
