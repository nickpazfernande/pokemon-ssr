import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-pages',
  imports: [],
  templateUrl: './about-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class AboutPagesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta)

  ngOnInit() {
    this.title.setTitle('About Us');
    this.meta.updateTag({ name: 'description', content: 'Learn more about our company and team.' });
    this.meta.updateTag({ name: 'og:title', content: 'About Us' });
    this.meta.updateTag({ name: 'keywords', content: 'about, company, team, information, Nick' });
  }

}
