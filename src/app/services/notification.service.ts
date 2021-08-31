import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService,
    private router: Router) { }
   
  /**
   * @name success
   * @description get success message 
   * @param  {any} message
   */
  success( message:any){
      this.toastrService.success(message);
  }
   
  /**
   * @name error
   * @description get error message
   * @param  {any} message
   */
  error( message:any){
      this.toastrService.error(message);
  }
   
  /**
   * @name info
   * @description get info message
   * @param  {any} message
   */
  info( message:any){
      this.toastrService.info(message);
  }
   
  /**
   * @name warning
   * @description get warning message
   * @param  {any} message
   */
  warning( message:any){
      this.toastrService.warning(message);
  }
   



  public navigate(routingUrl: String) {
    this.router.navigate([routingUrl]);
  }

 
  tostMessage(type: any, message: string) {
    // console.
    if (type == undefined) {
      type = 'success';
    }
    Swal.fire({
     // position: 'top-right',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  }

  successToastMessage(message: string) {
    this.tostMessage('success',message);
  }

  
  errorToastMessage(message: string) {
    this.tostMessage('error',message);
  }

  
  infoToastMessage(message: string) {
    this.tostMessage('info',message);
  }

  warningToastMessage(message: string) {
    this.tostMessage('warning',message);
  }

 
}

