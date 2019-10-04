import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  countries: any[];

  set selectedCountry(value: any) {
    console.log(value);
    this.translocoService.setActiveLang(value.lang);
  }
  get selectedCountry() {
    return null;
  }

  constructor(private translocoService: TranslocoService) {
    this.countries = [
      { name: 'English', flag: 'us.svg', lang: 'en' },
      { name: 'Persian', flag: 'ir.svg', lang: 'fa' },
    ];
  }

  setLocale() {
  }
}
