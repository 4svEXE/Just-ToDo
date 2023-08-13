import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { TaskInterface } from "./../interfaces/index";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private readonly LSTableName = "tasks";
  tasks!: TaskInterface[];

  private tasksData: TaskInterface[] = [];

  private tasksDataObservable: Observable<TaskInterface[]> = new Observable(
    (observer) => {
      observer.next(this.tasksData);
    }
  );
  private dataSubject: BehaviorSubject<TaskInterface[]> = new BehaviorSubject(
    this.tasksData
  );

  getDataObservable(): Observable<TaskInterface[]> {
    return this.tasksDataObservable;
  }

  addData(newData: TaskInterface[]): void {
    this.tasksData = newData;
    this.dataSubject.next(this.tasksData);
  }

  constructor() {
    this.addData(this.getTasks());
  }

  getTasks() {
    let Tasks = localStorage.getItem(this.LSTableName) || "[]";
    return JSON.parse(Tasks);
  }

  setTasks(tasks: TaskInterface[]) {
    const Tasks = JSON.stringify(tasks);
    localStorage.setItem(this.LSTableName, Tasks);
    this.addData(this.getTasks());
  }

  setTask(task: TaskInterface) {
    let Tasks = this.getTasks();
    Tasks.push(task);
    this.setTasks(Tasks);
  }

  deleteTask(id: string) {
    let Tasks = this.getTasks();

    Tasks = Tasks.filter((task: TaskInterface) => {
      return !(task.id === id);
    });

    this.setTasks(Tasks);
  }

  toggleCheckbox(id: string) {
    let Tasks = this.getTasks();

    Tasks.map((task: TaskInterface) => {
      if (task.id === id) {
        task.isChecked = !task.isChecked;
      }
    });

    this.setTasks(Tasks);
  }
}
