import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute,Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/helpers/customValidations';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;
 
  private subs = new SubSink();
  public inputType: string = 'password'
  public showPass: boolean = false;
  key1:string;
  key2:string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private titleService: Title,
    private metaTagService: Meta
    ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params) => {
      this.key1 = params.key1;
      this.key2 = params.key2;
    });
    this.resetForm = this.formBuilder.group({
      password: ['', { validators: [Validators.required, Validators.maxLength(15), Validators.minLength(3)] }],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword'),
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.resetForm.get(field).valid && this.resetForm.get(field).touched) ||
      (this.resetForm.get(field).untouched && this.submitted)
    );
  }
  // getter for easy access to form fields.
  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.spinner.show();
    const body = new HttpParams()
      .set('password', this.f.password.value).set('password2', this.f.confirmPassword.value)
    this.subs.sink = this.authService.resetPassword(body,this.key1,this.key2).subscribe((response: any) => {
      this.spinner.hide();
      this.submitted = false;
      this.resetForm.reset();
      Swal.fire(
        'Sent!',
        'Password reset successfully. Please Login with new password!',
        'success'
      )
      this.router.navigate([`/login`]);
    }, (err: HttpErrorResponse) => {
      this.spinner.hide();
      this.submitted = false;
      if (err.status == 400) {
        Swal.fire(
          'Invalid',
          'Please enter valid reset link!',
          'error'
        )
      } else {
        this.toastr.error('Something went wrong!!');
      }
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onboardingCarouselOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
