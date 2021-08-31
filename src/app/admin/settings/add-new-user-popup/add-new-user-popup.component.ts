import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollaboratorRequest } from 'src/app/interfaces/collaboratorRequest';
import { Privilege } from 'src/app/interfaces/privilege';
import { AuthService } from 'src/app/services/auth.service';

import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-new-user-popup',
  templateUrl: './add-new-user-popup.component.html',
  styleUrls: ['./add-new-user-popup.component.scss'],
})
export class AddNewUserPopupComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  privileges: Array<Privilege> = [];

  public editMode: boolean = false;
  //user create Model
  collaborator: CollaboratorRequest = {
    email: '',
    phone: undefined,
    privilege: undefined,
    username: '',
    department: undefined,
  };

  //form input validation
  form = this.formBuilder.group({
    email: ['', Validators.required],
    phone: ['', [Validators.required]],
    privilege: ['', [Validators.required]],
    username: ['', [Validators.required]],
    department: ['', [Validators.required]]
  });

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private authService: AuthService,
    private notifyService: NotificationService,
    public _dialogRef: MatDialogRef<AddNewUserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.privilegesGroupList();
    if (this.editMode != false) {
      // this.privileges = this.data;
      console.log("Data ", this.data);
      this.form.patchValue(this.data);
      this.form.controls.privilege.patchValue(this.data['privilege'])
      console.log("id: " + this.data['privilege']);
      this.form.controls.department.patchValue(this.data['privilege'])
      console.log("id2: " + this.data['privilege']);
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
   * @name createCollaborators
   * @description creating collaborator
   */
  createCollaborators(edit = false, data: any = null) {

    var formData: any = new FormData();
    formData.append('email', this.form.controls.email.value);
    formData.append('phone', this.form.controls.phone.value);
    formData.append('privilege', this.form.controls.privilege.value);
    formData.append('username', this.form.controls.username.value);
    formData.append('department', this.form.controls.department.value);
    if (edit == false) {
      this.subscriptions.push(
        this.settingsService
          .createCollaborators(formData, this.authService.apiAuth())
          .subscribe(
            (response: any) => {
              this.notifyService.tostMessage('success', response.detail);
              // this.autoRefresh();
            },
            (error: any) => {
              this.notifyService.tostMessage('warning', error.detail);
            }
          )
      );
    } else {
      var formData: any = new FormData();
      formData.append('email', this.form.controls.email.value);
      formData.append('phone', this.form.controls.phone.value);
      formData.append('privilege', this.form.controls.privilege.value);
      formData.append('username', this.form.controls.username.value);
      formData.append('department', this.form.controls.department.value)
      this.settingsService.editCollaborator(this.data.id, formData, this.authService.apiAuth()).subscribe((response: any) => {
        this.notifyService.tostMessage('success', response.detail);
        // this.autoRefresh();
      },
        (error: any) => {
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
