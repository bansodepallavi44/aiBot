import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotTrainingRoutingModule } from './bot-training-routing.module';
import { BotFlowChartComponent } from './bot-flow-chart/bot-flow-chart.component';
import { BotTrainingSidebarComponent } from './bot-training-sidebar/bot-training-sidebar.component';
import { AddNewTrainingComponent } from './add-new-training/add-new-training.component';
import { CreateChildIntentPopupComponent } from './create-child-intent-popup/create-child-intent-popup.component';
import { BotTrainingComponent } from './bot-training.component';
import { QuestionsComponent } from './questions/questions.component';
import { IframeSettingsComponent } from './iframe-settings/iframe-settings.component';
import { BotPluginsComponent } from '../bot-plugins/bot-plugins.component';
import { BotPluginDetailComponent } from '../bot-plugin-detail/bot-plugin-detail.component';

@NgModule({
  declarations: [
    AddNewTrainingComponent,
    BotTrainingSidebarComponent,
    BotFlowChartComponent,
    CreateChildIntentPopupComponent,
    BotTrainingComponent,
    QuestionsComponent,
    IframeSettingsComponent
  ],
  imports: [
    CommonModule,
    BotTrainingRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class BotTrainingModule { }
