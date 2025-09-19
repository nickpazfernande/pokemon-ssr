import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-pages',
  imports: [],
  templateUrl: './contact-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class ContactPagesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta)

  ngOnInit() {
    this.title.setTitle('Contact Us');
    this.meta.updateTag({ name: 'description', content: 'Get in touch with our team for any inquiries or support.' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Us' });
    this.meta.updateTag({ name: 'keywords', content: 'contact, support, inquiries, help, Nick' });
  }
}
