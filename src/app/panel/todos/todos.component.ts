import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/data/todo.service';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/_models/todo';
import { MessageService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
    private todoService: TodoService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  delete(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(
      response => this.messageService.add({
        severity: 'success',
        summary: 'deleted successfully'
      }),
      error => this.messageService.add({
        severity: 'success',
        summary: 'deleted failed',
        detail: error
      }),
    );
  }

  toggle(todo: Todo) {
    this.todoService.toggle(todo.id).subscribe(
      response => this.messageService.add({
        severity: 'success',
        summary: 'toggle successful'
      }),
      error => this.messageService.add({
        severity: 'success',
        summary: 'toggle failed',
        detail: error
      }),
    );
  }


}
