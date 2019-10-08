import { Injectable } from '@angular/core';
import { CachedReadableService } from './cached-readable.service';
import { IModel } from 'src/app/_models/IModel';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, shareReplay } from 'rxjs/operators';

export class CachedCrudService<T extends IModel> extends CachedReadableService<T> {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(http, baseUrl);
  }

  protected cacheAdd(created: T) {
    // add to full cache if exists
    if (this.cache$) {
      this.cache$ = this.cache$.pipe(map(
        data => {
          data.push(created);
          return data;
        }
      )).pipe(shareReplay(1));
    } else {
      this.singleCache$.set(created.id, of(created).pipe(shareReplay(1)));
    }
  }

  protected cacheUpdate(id: number | string, updated: T) {
    // update full cache if exists
    if (this.cache$) {
      this.cache$ = this.cache$.pipe(map(
        data => {
          return data.map(
            x => {
              if (x.id === updated.id) {
                return updated;
              } else {
                return x;
              }
            }
          );
        }
      )).pipe(shareReplay(1));
    } else {
      this.singleCache$.set(updated.id, of(updated).pipe(shareReplay(1)));
    }
  }

  protected cacheDelete(id: number | string) {
    // delete from full cache if exists
    if (this.cache$) {
      this.cache$ = this.cache$.pipe(map(
        data => {
          return data.filter(x => x.id !== id);
        }
      )).pipe(shareReplay(1));
    }
    if (this.singleCache$.has(id)) {
      this.singleCache$.delete(id);
    }
  }

  /**
   * creates record on db and adds created record to cache
   *
   * @returns saved record
   */
  public create(record: T): Observable<T> {
    return this.requestCreate(record).pipe(tap(
      created => this.cacheAdd(created)
    ));
  }

  /**
   * saves record to db and updates related cache value
   *
   * @returns saved record
   */
  public update(id: number | string, record: T): Observable<T> {
    return this.requestUpdate(id, record).pipe(tap(
      updated => this.cacheUpdate(id, updated)
    ));
  }

  /**
   * delete record from db and remove related cache value
   *
   * @returns affected rows
   */
  public delete(id: string | number): Observable<number> {
    return this.requestDelete(id).pipe(tap(
      affected => this.cacheDelete(id)
    ));
  }

  /**
   * @returns saved record
   */
  public requestCreate(record: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, record);
  }

  /**
   * @returns saved record
   */
  public requestUpdate(id: number | string, record: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + id, record);
  }

  /**
   * @returns affected rows
   */
  public requestDelete(id: string | number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + '/' + id);
  }
}


