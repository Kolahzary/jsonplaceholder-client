import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/data/todo.service';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/_models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  get todos$(): Observable<Todo[]> {
    return this.todoService.getAll();
  }

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

}
