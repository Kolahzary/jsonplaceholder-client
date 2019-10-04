import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';
import { translocoLoader } from './transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';

import { LoggerInterceptor } from './_infrastructure/logger.interceptor';
import { environment } from '../environments/environment';

import {
  TodosComponent,
  TodoFormComponent } from './panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    SelectButtonModule,
    TranslocoModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'fa'],
        reRenderOnLangChange: true,
        fallbackLang: 'en',
        defaultLang: 'en',
        prodMode: environment.production,
      } as TranslocoConfig
    },
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
