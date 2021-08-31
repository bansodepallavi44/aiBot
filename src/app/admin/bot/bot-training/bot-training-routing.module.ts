import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotPluginDetailComponent } from '../bot-plugin-detail/bot-plugin-detail.component';
import { BotPluginsComponent } from '../bot-plugins/bot-plugins.component';
import { AddNewTrainingComponent } from './add-new-training/add-new-training.component';
import { BotTrainingComponent } from './bot-training.component';
import { IframeSettingsComponent } from './iframe-settings/iframe-settings.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: ':name',
    component: BotTrainingComponent, children:[
      {
        path: '',
        component: QuestionsComponent,
      },
      {
        path: 'iframe',
        component: IframeSettingsComponent,
      },
      {
        path: 'add',
        component: AddNewTrainingComponent,
      },
      {
        path: 'edit/:id',
        component: AddNewTrainingComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotTrainingRoutingModule { }
