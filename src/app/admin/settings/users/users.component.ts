import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollaboratorRequest } from 'src/app/interfaces/collaboratorRequest';
import { Collaborator } from 'src/app/interfaces/collaborator';

import { SettingsService } from 'src/app/services/settings.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddNewUserPopupComponent } from './../add-new-user-popup/add-new-user-popup.component';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { AddTeamUserPopupComponent } from '../add-team-user-popup/add-team-user-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent  implements OnInit {
  private subscriptions: Subscription[] = [];
  collaborators: Array<Collaborator> = [];
  searchKeyword: string;
  teamId:any;
  collaboratorData:any;
  title = "User Management";
  userMenu = true; 
  //user create Model
  collaborator: CollaboratorRequest = {
    email: '',
    phone: undefined,
    privilege: undefined,
    username: '',
    department:undefined,
  };

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private notifyService: NotificationService,
    private authService:AuthService,
    private _dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.activeRoute.params
      .subscribe((params) => {
        if (params.id != undefined) {
          this.teamId = params.id;
        }
      });
      if(this.teamId!=undefined && this.teamId!=""){
        this.userMenu=false
        this.teamCollaboratorList(this.teamId);
      }else{
        this.userMenu=true
        this.collaboratorList();
      }
    
  }

  /**
   * @name onAddNewUSer
   * @description open add new user popup
   */
  public onAddNewUSer() {
    if(this.teamId){
      const dialogRef = this._dialog.open(AddTeamUserPopupComponent, {
        width: '700px',
        autoFocus: false,
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        this.collaboratorData['users']=result
        if(result.length>0){
          this.settingsService.editPrivilegeGroup(this.teamId,this.collaboratorData,this.authService.apiAuth()).subscribe((res)=>{
            this.notifyService.tostMessage('success',"Users added")
          },
          (error)=>{
            this.notifyService.tostMessage('success',"Users not added")
          })
        }
      });
    }else{
      const dialogRef = this._dialog.open(AddNewUserPopupComponent, {
        width: '700px',
        autoFocus: false,
      });
  
      dialogRef.afterClosed().subscribe((result) => {});
    }
   
  }

  /**
   * @name collaboratorList
   * @description getting list of all collaborator
   */
  public collaboratorList() {
    this.subscriptions.push(
      this.settingsService
        .collaboratorsList(this.authService.apiAuth())
        .subscribe((response: any) => {
          this.collaborators = response;
        })
    );
  }

  /**
   * @name fail
   * @description showing error message using tost
   */
  public fail(error: any) {
    this.notifyService.tostMessage('warning', error.detail);
  }

  /**
   * @name deleteCollaborator
   * @description deleting collaborator
   */
  public deleteCollaborator(id: number) {
    Swal.fire({
      title: 'Want to delete?',
      html: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        this.subscriptions.push(
          this.settingsService.deleteCollaborator(id, this.authService.apiAuth()).subscribe(
            (response: any) => {
              this.notifyService.tostMessage('success', response.detail);
              this.collaboratorList();
              //this.autoRefresh();
            },
            (error: any) => {
              this.notifyService.tostMessage('warning', error.detail);
            }
          )
        );
        this.ngOnInit();
      }
    });
  }

  /**
   * @name onSelectUSers
   * @description open select users popup
   */
   public onSelectUSers(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.data = data;
    dialogConfig.panelClass = ['animate__animated', 'animate__slideInLeft'];

    const dialogRef = this._dialog.open(
      AddNewUserPopupComponent,
      dialogConfig
    );

    dialogRef.componentInstance.editMode=true;
    dialogRef.afterClosed().subscribe((result) => {});
  }


  teamCollaboratorList(teamId:any){
    this.settingsService.teamCollaboratorList(this.authService.apiAuth(),teamId).subscribe((res:any)=>{
      this.title=res[0]['name']
      this.collaboratorData= res[0];
      this.collaborators = res[0]['users']
    })
  }
  

  /**
   * @name ngOnDestroy
   * @description unsubscribe to avoid memory leaks
   */
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
