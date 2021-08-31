import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LiveChatRoutingModule } from './live-chat-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from "./chat/chat.service";
import { WebsocketService } from "./chat/websocket.service";

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    LiveChatRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [ChatService, WebsocketService]
})
export class LiveChatModule { }
