import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DirectionService } from './_services/ui/direction.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  countries: any[];

  get ltr$(): BehaviorSubject<boolean> {
    return this.directionService.ltr$;
  }

  set selectedCountry(value: any) {
    this.directionService.ltr$.next(value.ltr);
    this.translocoService.setActiveLang(value.lang);
  }

  constructor(
    private directionService: DirectionService,
    private translocoService: TranslocoService
    ) {
    this.countries = [
      { name: 'English', flag: 'us.svg', lang: 'en', ltr: true },
      { name: 'Persian', flag: 'ir.svg', lang: 'fa', ltr: false },
    ];
  }
}
