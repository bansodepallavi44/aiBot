import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'bot',
        loadChildren: () => import('./bot/bot.module').then((m) => m.BotModule),
      },
      {
        path: 'plugins',
        loadChildren: () =>
          import('./plugins/plugins.module').then((m) => m.PluginsModule),
      },
      {
        
        path: 'live-chat',
        loadChildren: () =>
          import('./live-chat/live-chat.module').then((m) => m.LiveChatModule),
      },
      {
        path: '',
        redirectTo: 'bot',
        pathMatch: 'full',
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
