import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachedCrudService } from '../infrastructure/cached-crud.service';
import { Todo } from 'src/app/_models/todo';
import { environment } from 'src/environments/environment';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends CachedCrudService<Todo> {
  private filter: string;

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/todos`);
  }

  getAllFiltered(): Observable<Todo[]> {
    if (isNullOrUndefined(this.filter)) {
      return this.getAll();
    } else {
      return this.getAll().pipe(map(
        data => data.filter(x => x.title.includes(this.filter))
      ));
    }
  }

  toggle(id: number) {
    return this.get(id)
      .pipe(flatMap(
        x => this.update(x.id, {
          id: x.id,
          title: x.title,
          completed: !x.completed,
          userId: x.userId
        })));
  }

  setFilter(value: string) {
    this.filter = value;
  }

}
