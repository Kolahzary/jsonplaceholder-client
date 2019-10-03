import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IModel } from 'src/app/_models/IModel';
import { map, shareReplay, find } from 'rxjs/operators';

const CACHE_SIZE = 1;

export class CachedReadableService<T extends IModel> {
  protected cache$: Observable<T[]>;
  protected singleCache$ = new Map<number | string, Observable<T>>();

  constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) { }

  public getAll(): Observable<T[]> {
    if (!this.cache$) {
      this.cache$ = this.requestGetAll().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  public clearCache(): void {
    this.cache$ = null;
    this.singleCache$.clear();
  }

  public get(id: number | string): Observable<T> {
    if (this.cache$) {
      return this.getAll().pipe(map(data => data.find(x => x.id === id)));
    } else {
      if (! this.singleCache$.has(id)) {
        this.singleCache$.set(id, this.requestGet(id).pipe(
          shareReplay(CACHE_SIZE)
          ));
      }

      return this.singleCache$.get(id);
    }
  }

  public requestGetAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  public requestGet(id: number | string): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id);
  }
}
