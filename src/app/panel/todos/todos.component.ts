import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/data/todo.service';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/_models/todo';
import { MessageService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  get todos$(): Observable<Todo[]> {
    return this.todoService.getAllFiltered();
  }

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private translocoService: TranslocoService
  ) { }

  ngOnInit() {
  }

  delete(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(
      response => this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('todo-toggle-success'),
      }),
      error => this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('todo-delete-failed'),
        detail: error
      }),
    );
  }

  toggle(todo: Todo) {
    this.todoService.toggle(todo.id).subscribe(
      response => this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('todo-toggle-success'),
      }),
      error => this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('todo-toggle-failed'),
        detail: error
      }),
    );
  }


}
