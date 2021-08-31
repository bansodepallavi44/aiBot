import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-bot-plugin-detail',
  templateUrl: './bot-plugin-detail.component.html',
  styleUrls: ['./bot-plugin-detail.component.scss']
})
export class BotPluginDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onboardingCarouselOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

}
