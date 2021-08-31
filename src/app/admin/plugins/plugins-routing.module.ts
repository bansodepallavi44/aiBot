import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotPluginsComponent } from '../bot/bot-plugins/bot-plugins.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
