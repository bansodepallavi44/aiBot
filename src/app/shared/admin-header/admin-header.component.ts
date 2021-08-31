import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,Location } from '@angular/common';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent  implements OnInit {

  constructor(protected router: Router,
    protected notifyService: NotificationService,
    private cookieService: CookieService,
    private location:Location,
    @Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {}

  /**
  * @name logout
  * @description login out and cleaning local storage
  */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      //console.log(this.location )
      this.cookieService.deleteAll('/');
      //localStorage.clear();
      this.router.navigate(['auth/login']);
    }
  }
}
