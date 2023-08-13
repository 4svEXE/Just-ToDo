import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { IdeasManagerComponent } from './components/ideas-manager/ideas-manager.component';
import { TaskComponent } from './components/shared/task/task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskManagerComponent,
    IdeasManagerComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

