import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBotsComponent } from './all-bots/all-bots.component';
import { BotPluginDetailComponent } from './bot-plugin-detail/bot-plugin-detail.component';
import { BotPluginsComponent } from './bot-plugins/bot-plugins.component';
import { AddNewTrainingComponent } from './bot-training/add-new-training/add-new-training.component';
import { BotComponent } from './bot/bot.component';

const routes: Routes = [
  {
    path: '',
    component: BotComponent,
    children: [
      {
        path: '',
        component: AllBotsComponent,
      },
      {
        path: 'all-bots',
        component: AllBotsComponent,
      },
      {
        path: 'training',
        loadChildren: () => import('./bot-training/bot-training.module').then(m => m.BotTrainingModule)
      },
      {
      path: 'add-new-training',
      component: AddNewTrainingComponent,
    },
    {
      path: 'plugins/all',
      component: BotPluginsComponent,
      pathMatch: 'full'
    },
    {
      // Change 'salesforce' to dynamic plugin name
      path: 'plugin/:pluginName',
      component: BotPluginDetailComponent,
    },

    {
      path: 'configuration',
      //component: IframeSettingsComponent,
     loadChildren: () => import('./bot-training/bot-training.module').then(m=>m.BotTrainingModule)
    },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotRoutingModule {}
