import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SignUp } from 'src/app/interfaces/signUp';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  errorMsg: any;
  error: boolean = false;
  expiredDate = new Date();
  //signUp model
  signUp: SignUp = {
    email: '',
    password: '',
    company_name: '',
    password2: '',
    company_logo:
      'https://c0.klipartz.com/pngpicture/503/611/gratis-png-chatbot-internet-bot-kik-messenger-telegrama-de-messenger-de-facebook-centro-comercial-ama.png',
    confirmPassword: '',
    userName: '',
    employee_strength: undefined,
  };

  // input form validation
  form = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
    company_name: ['', [Validators.required]],
    employee_strength: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifyService: NotificationService,
    private authService: AuthService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) {
    this.expiredDate.setDate( this.expiredDate.getDate() + 30 );
  }

  ngOnInit(): void {
    if (this.cookieService.get('refresh')) {
        let input = { refresh: this.cookieService.get('refresh')};
        this.autoLogin(input);
    }

  }

  autoLogin(input: any) {
    this.subscriptions.push(
      this.authService.refreshToken(input).subscribe(
        (response) => this.successLogin(response,true),
        (error) => { this.loginFail(error.error); }
      )
    );
  }

  /**
   * @name successLogin
   * @description storing token to local storage and navigate to dashboard
   * @param  {any} response
   */
   public successLogin(response: any,remember_me:any) {
    //token here is stored in a local storage
    if(remember_me){
      this.cookieService.deleteAll('/')
      this.cookieService.set('refresh', response.refresh,this.expiredDate ); 
      this.cookieService.set('access', response.access,this.expiredDate ); 
    }else{
      this.cookieService.set('refresh', response.refresh ); 
      this.cookieService.set('access', response.access ); 
    }
    //localStorage.setItem('refresh', response.refresh);
    //localStorage.setItem('access', response.access);

    //navigate to the dashboard
    this.router.navigate(['admin/bot/all-bots']);
  }

  /**
   * @name loginFail
   * @description failure message
   * @param  {any} error
   */
  public loginFail(error: any) {
    this.error = true;
    this.errorMsg = error.detail;
  }

   // unsubscribe to avoid memory leaks
  

  onboardingCarouselOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  /**
   * @name save
   * @description set the value in model and calling signUp api
   */
  public save() {
    this.subscriptions.push(
      this.authService.signUp(this.form.value).subscribe(
        (response:any) => {
          this.notifyService.tostMessage('success',response.detail);
          //navigate to the login page
          this.router.navigate(['auth/login']);
        },
        (error) => {
          this.notifyService.errorToastMessage(error.detail);
        }
      )
    );
  }

  /**
   * @name ngOnDestroy
   * @description    unsubscribe to avoid memory leaks
   */
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
