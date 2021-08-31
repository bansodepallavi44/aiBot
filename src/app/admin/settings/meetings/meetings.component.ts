import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { SettingsService } from 'src/app/services/settings.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateNewTeamPopupComponent } from '../create-new-team-popup/create-new-team-popup.component';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';
import { Privilege } from 'src/app/interfaces/privilege';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PrivilegeGroup } from 'src/app/interfaces/privilegeGroup';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent  implements OnInit{
  privileges: Array<Privilege> = [];
  private subscriptions: Subscription[] = [];
  searchKeyword: string;

  created: Date = new Date();
  displayedColumns: string[] = ['Group Name', 'Owner', 'Users', 'Creation Date', 'Delete Users'];
  dataSource = new MatTableDataSource<Privilege>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // public dataSource = new MatTableDataSource<Privilege>();
  // @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor(
    protected router: Router,
    private settingServices: SettingsService,
    private notifyService: NotificationService,
    private _dialog: MatDialog,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {
   this.privilegeGroupList();
   this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
  // this.dataSource = new MatTableDataSource(this.privileges);
  // this.dataSource.paginator = this.paginator;
  }

  /**
   * @name onCreateNewTeam
   * @description open create new team popup
   */
  public onCreateNewTeam() {
    const dialogRef = this._dialog.open(CreateNewTeamPopupComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  /**
   * @name privilegeGroupList
   * @description getting list of privileges groups
   */
  public privilegeGroupList() {
    this.subscriptions.push(
      this.settingServices
        .privilegeGroupList(this.authService.apiAuth())
        .subscribe((response: any) => {
          this.privileges = response;
        })
    );
  }

  getSingleTeam(id:any){
    this.router.navigate(['/admin/settings/edit',id])
  }

  /**
   * @name deletePrivilegeGroup
   * @description delete privilege group
   * @param  {number} id
   */
  public deletePrivilegeGroup(event:any,id: number) {
    event.stopPropagation()
    Swal.fire({
      title: 'Want to delete?',
      html: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        this.subscriptions.push(this.settingServices
          .deletePrivilegeGroup(id, this.authService.apiAuth())
          .subscribe((response: any) =>  {
            this.notifyService.tostMessage('success', response.detail);
            this.privilegeGroupList();
            // this.autoRefresh();
          },(error:any)=>{
            this.notifyService.tostMessage('warning', error.detail);
          }));
      }
    });
  }

  /**
   * @name onSelectUSers
   * @description open select users popup
   */
  public onSelectUSers(event:any,data:any) {
    event.stopPropagation()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '800px';
    dialogConfig.data = data;
    dialogConfig.panelClass = ['animate__animated', 'animate__slideInLeft'];

    const dialogRef = this._dialog.open(
      CreateNewTeamPopupComponent,
      dialogConfig
    );

    dialogRef.componentInstance.editMode=true;
    dialogRef.afterClosed().subscribe((result) => {});
  }

    /**
     * @name ngOnDestroy
     * @description unsubscribe to avoid memory leaks
     */
    ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

} 
