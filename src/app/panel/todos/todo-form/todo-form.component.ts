import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/_services/data/todo.service';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  value: string;

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private translocoService: TranslocoService
  ) { }

  ngOnInit() {
  }

  add() {
    this.todoService.create({
      id: null,
      userId: null,
      title: this.value,
      completed: false,
    }).subscribe(
      response => this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('todo-add-success'),
      }),
      error => this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('todo-add-failed'),
        detail: error
      }),
    );
  }
}
