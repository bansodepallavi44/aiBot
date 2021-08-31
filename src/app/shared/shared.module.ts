import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { RemoveSpacePipe } from '../helpers/remove-space.pipe';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';

import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    ChatbotComponent,
    VideoPlayerComponent,
    RemoveSpacePipe,
    RichTextEditorComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    MaterialModule,
    QuillModule
  ],
  exports: [
    MaterialModule,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ChatbotComponent,
    VideoPlayerComponent,
    RemoveSpacePipe,
    VideoPlayerComponent,
    QuillModule,
    RichTextEditorComponent
  ],
  providers:[
    RemoveSpacePipe
  ]
})
export class SharedModule { }
