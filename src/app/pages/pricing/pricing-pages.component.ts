import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  private platform = inject(PLATFORM_ID);

  ngOnInit() {
    //Esto se ejecuta en el servidor y en el cliente
    //El server muestra "PLATFORM_ID: server"
    //El cliente muestra "PLATFORM_ID: browser"
    console.log('PLATFORM_ID:', this.platform);
    //Este codigo solo funciona del lado del cliente
    // if (!isPlatformServer(this.platform)) {
    //Esto no sirve para SEO
    //El HTML ya fue generado en el servidor
    //y el cliente solo lo "hidrata"
    //   document.title = 'Pricing Plans - Nick';
    // }
    this.title.setTitle('Pricing Plans');
    this.meta.updateTag({ name: 'description', content: 'Learn more about our pricing plans and options.' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Plans' });
    this.meta.updateTag({ name: 'keywords', content: 'pricing, plans, subscription, costs, Nick' });
  }
}
