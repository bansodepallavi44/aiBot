import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BotRoutingModule } from './bot-routing.module';
import { AllBotsComponent } from './all-bots/all-bots.component';
import { CreateNewBotPopupComponent } from './create-new-bot-popup/create-new-bot-popup.component';
import { CreateWorkspacePopupComponent } from './create-workspace-popup/create-workspace-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotSidebarComponent } from './bot-sidebar/bot-sidebar.component';
import { BotComponent } from './bot/bot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotPluginsComponent } from './bot-plugins/bot-plugins.component';
import { BotPluginDetailComponent } from './bot-plugin-detail/bot-plugin-detail.component';

@NgModule({
  declarations: [
    AllBotsComponent,
    CreateNewBotPopupComponent,
    CreateWorkspacePopupComponent,
    BotSidebarComponent,
    BotComponent,
    BotPluginDetailComponent,
     BotPluginsComponent 

    ],
  imports: [
    CommonModule,
    BotRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
  ],
  providers:[

  ]
})
export class BotModule { }
