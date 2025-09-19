import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-pages',
  imports: [],
  templateUrl: './pricing-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class PricingPagesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Pricing Plans');
    this.meta.updateTag({ name: 'description', content: 'Learn more about our pricing plans and options.' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Plans' });
    this.meta.updateTag({ name: 'keywords', content: 'pricing, plans, subscription, costs, Nick' });
  }
}
