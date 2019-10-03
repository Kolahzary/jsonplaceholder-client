import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedCrudService } from '../infrastructure/cached-crud.service';
import { Todo } from 'src/app/_models/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends CachedCrudService<Todo> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/todos`);
  }

}
