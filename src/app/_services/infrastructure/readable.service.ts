import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IModel } from 'src/app/_models/IModel';
import { Observable } from 'rxjs';

export class ReadableService<T extends IModel> {

  constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) { }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  public get(id: number | string): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id);
  }
}

