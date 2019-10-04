import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { TodoService } from 'src/app/_services/data/todo.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {
  value: string;

  constructor(
    private todoService: TodoService) { }

  ngOnInit() {
  }

  filter() {
    this.todoService.setFilter(this.value);
  }

}
