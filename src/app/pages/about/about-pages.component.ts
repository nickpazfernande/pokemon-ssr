import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'about-pages',
  imports: [],
  templateUrl: './about-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class AboutPagesComponent { }
