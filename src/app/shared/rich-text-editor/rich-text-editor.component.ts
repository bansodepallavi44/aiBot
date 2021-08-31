import { Component, ElementRef, EventEmitter,OnInit, Output,Input, ViewChild } from '@angular/core';

import 'quill-emoji/dist/quill-emoji.js'

import Quill from 'quill';


const parchment = Quill.import('parchment')
const block = parchment.query('block')
block.tagName = 'DIV'
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true)
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit {
  @ViewChild('editor', {static: true}) editor: ElementRef<any>;
  @Output() textChanged: EventEmitter<any> = new EventEmitter()
  @Input() htmlContent:any;
  modules = {}

  constructor() {
    
    this.modules = {
      'emoji-shortname': false,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      'toolbar': { container:  ['blockquote', 'code-block', 'bold', 'italic', 'underline', 'emoji', 'strike', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }, 'clean'], }
    }
   }

   ngOnInit(){

   }

   created(event:any) {
    // tslint:disable-next-line:no-console
    event.container.firstChild.innerHTML=this.htmlContent
    //console.log('editor-created', event.container.firstChild.innerHTML)
  }

  // created(event:any) {
  //   // tslint:disable-next-line:no-console
  //   console.log('editor-created', event)
  // }

  changedEditor(event:any) {
    this.textChanged.emit(event.html);
    //console.log('editor-change', event.html);
  }

  blur(event:any) {
    // tslint:disable-next-line:no-console
    this.textChanged.emit(event.editor.container.firstChild.innerHTML);
    //console.log("inner -- ",event.html)
  }
}