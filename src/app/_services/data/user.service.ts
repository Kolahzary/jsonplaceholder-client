import { Injectable } from '@angular/core';
import { CachedCrudService } from '../infrastructure/cached-crud.service';
import { User } from 'src/app/_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CachedCrudService<User> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/users`);
  }

}
