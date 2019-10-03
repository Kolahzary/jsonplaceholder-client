import { Injectable } from '@angular/core';
import { IModel } from 'src/app/_models/IModel';
import { ReadableService } from './readable.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T extends IModel> extends ReadableService<T>  {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(http, baseUrl);
  }

  /**
   * @returns saved record
   */
  public create(record: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, record);
  }

  /**
   * @returns saved record
   */
  public update(id: number | string, record: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + id, record);
  }

  /**
   * @returns affected rows
   */
  public delete(id: string | number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + '/' + id);
  }
}
