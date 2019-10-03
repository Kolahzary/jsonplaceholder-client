import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './panel';


const routes: Routes = [
  { path: 'panel/todos', component: TodosComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'panel/todos', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
