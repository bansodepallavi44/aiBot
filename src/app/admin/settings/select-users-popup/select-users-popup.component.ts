import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/interfaces/privilege';
import { AuthService } from 'src/app/services/auth.service';

import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-select-users-popup',
  templateUrl: './select-users-popup.component.html',
  styleUrls: ['./select-users-popup.component.scss'],
})
export class SelectUsersPopupComponent  implements OnInit {
  private subscriptions: Subscription[] = [];
  searchKeyword: string;

  constructor(
    private router: Router,
    private notifyService: NotificationService,
    public settingServices: SettingsService,
    private authService:AuthService,
    public formBuilder: FormBuilder,
    public _dialogRef: MatDialogRef<SelectUsersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public privilege: Privilege
  ) {
    
  }

  ngOnInit(): void {}

  /**
   * @name closeDialog
   * @description close popup
   */
  public closeDialog(): void {
    this._dialogRef.close();
  }

  /**
   * @name editPrivilegeGroup
   * @description edit privilege group
   * @param  {number} id
   */
  public editPrivilegeGroup() {
    this.settingServices
      .editPrivilegeGroup(this.privilege.id, this.privilege, this.authService.apiAuth())
      .subscribe(
        (response: any) => {
          this.notifyService.tostMessage('success', response.msg);
          // this.autoRefresh();
        },
        (error: any) => {
          this.notifyService.tostMessage('warning', error.detail);
        }
      );
  }

  /**
   * @name ngOnDestroy
   * @description unsubscribe to avoid memory leaks
   */
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
