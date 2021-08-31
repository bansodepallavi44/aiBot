import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import 'quill'

export interface Config {
  container: string
  unit: 'word'|'char'
}

export interface QuillInstance {
  on: any
  getText: any
}

export default class Counter {
  quill: QuillInstance
  options: Config

  constructor(quill: QuillInstance, options: Config,@Inject(PLATFORM_ID) private platformId: Object) {
    this.quill = quill
    this.options = options
    if(isPlatformBrowser(this.platformId)){
      const container: any = window.document.querySelector(this.options.container)
      this.quill.on('editor-change', () => {
        const length = this.calculate()
        container.innerHTML = length + ' ' + this.options.unit + 's'
      })
    }

    
  }

  calculate() {
    const text = this.quill.getText().trim()

    if (this.options.unit === 'word') {
      return !text ? 0 : text.split(/\s+/).length
    }
    return text.length
  }
}