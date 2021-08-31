import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QuillModule } from 'ngx-quill'
import { CookieService } from 'ngx-cookie-service';
import {MatExpansionModule} from '@angular/material/expansion';
import Counter from './counter';

import { NgxSpinnerModule } from "ngx-spinner";
import { isPlatformBrowser } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        preventDuplicates: true,
      }
    ),
    Ng2SearchPipeModule,
    QuillModule.forRoot(
       {
          suppressGlobalRegisterWarning: true
      //   customModules: [{
      //     implementation: Counter,
      //     path: 'modules/counter'
      //   }],
      //   customOptions: [{
      //     import: 'formats/font',
      //     whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      //   }]
      }
    ),
    NgxSpinnerModule,
  ],
  providers: [AuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,@Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
  }

 }

// {
//   customModules: [{
//     implementation: Counter,
//     path: 'modules/counter'
//   }],
//   customOptions: [{
//     import: 'formats/font',
//     whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
//   }]
// }