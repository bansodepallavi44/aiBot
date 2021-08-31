import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-team-user-popup',
  templateUrl: './add-team-user-popup.component.html',
  styleUrls: ['./add-team-user-popup.component.scss']
})
export class AddTeamUserPopupComponent implements OnInit {
  collaborators:any=[]
  selectedUsers:any = []
  searchKeyword: string;
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private notifyService: NotificationService,
    private authService:AuthService,
    public _dialogRef: MatDialogRef<AddTeamUserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.settingsService
        .collaboratorsList(this.authService.apiAuth())
        .subscribe((response: any) => {
          this.collaborators = response;
        })
  }

  handleSelected(event:any,id:any){
    if(event.target.checked === true){
      this.selectedUsers.push(id)
    }else{
      const index = this.selectedUsers.indexOf(id);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
    console.log("v",event.target.checked,"l",this.selectedUsers)
  }

  public closeDialog(): void {
    this._dialogRef.close(this.selectedUsers);
  }
  public done(): void {
    this._dialogRef.close(this.selectedUsers);
  }
  public cancel(): void {
    this._dialogRef.close([]);
  }


}
