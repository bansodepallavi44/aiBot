import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/interfaces/privilege';
import { PrivilegeGroup } from 'src/app/interfaces/privilegeGroup';
import { AuthService } from 'src/app/services/auth.service';

import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-create-new-team-popup',
  templateUrl: './create-new-team-popup.component.html',
  styleUrls: ['./create-new-team-popup.component.scss'],
})
export class CreateNewTeamPopupComponent  implements OnInit {

  private subscriptions: Subscription[] = [];
  privileges: Array<Privilege> = [];

  public editMode: boolean = false;

  //privilege model
  privilege: PrivilegeGroup = {
    department: undefined,
    privilege_action_ids: undefined,
    name: '',
  };

  //form input validation
  form = this.formBuilder.group({
    department: ['', Validators.required],
    privilege_action_ids: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  constructor(
    protected router: Router,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private notifyService: NotificationService,
    public _dialogRef: MatDialogRef<CreateNewTeamPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit(): void {
    this.privilegesGroupList();
    if (this.editMode != false) {
      console.log("Data ", this.data);
      this.form.patchValue(this.data);
      this.form.controls.privilege_action_ids.patchValue(this.data['privilege'])
    }
  }

  /**
   * @name closeDialog
   * @description close popup
   */
  public closeDialog(): void {
    this._dialogRef.close();
  }

  /**
   * @name privilegesGroupList
   * @description selecting privilege group
   */
  public privilegesGroupList() {
    this.subscriptions.push(
      this.settingsService
        .privilegeGroupList(this.authService.apiAuth())
        .subscribe((response: any) => (this.privileges = response))
    );
  }

  /**
   * @name createPrivilege
   * @description creating privilege group
   */
  public createPrivilege(edit = false, data: any = null) {
    if (edit == false) {
      var formData: any = new FormData();
      formData.append('privilege_action_ids', this.form.controls.privilege_action_ids.value);
      formData.append('name', this.form.controls.name.value);
      this.subscriptions.push(
        this.settingsService.createPrivilegeGroup(formData, this.authService.apiAuth()).subscribe(
          (response: any) => {
            this.notifyService.tostMessage('success', response.detail);
            this.router.navigate(['/admin/settings'])
          },
          (error: any) => {
            this.notifyService.tostMessage('warning', error.detail);
          }
        )
      );
    }
    else {
      var formData: any = new FormData();
      formData.append('privilege_action_ids', this.form.controls.privilege_action_ids.value);
      formData.append('name', this.form.controls.name.value);
      this.settingsService.editPrivilegeGroup(data.id, formData, this.authService.apiAuth()).subscribe((response: any) => {
        this.notifyService.tostMessage('success', response.detail);
        // this.autoRefresh();
        this.router.navigate(['/admin/settings'])
      }, (error: any) => {
        this.notifyService.tostMessage('warning', error.detail);
      })

    }
  }

  /**
     * @name ngOnDestroy
     * @description unsubscribe to avoid memory leaks
     */
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
