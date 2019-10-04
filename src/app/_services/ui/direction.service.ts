import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  ltr$ = new BehaviorSubject(true);

  get rtl$(): Observable<boolean> {
    return this.ltr$.pipe(map(x => !x));
  }

  constructor() { }
}
