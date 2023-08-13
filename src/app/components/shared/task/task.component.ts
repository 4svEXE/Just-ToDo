import { Component, Input } from "@angular/core";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent {
  @Input() title: string = "title";
  @Input() color: string = "red";
  @Input() taskId: string = "001";
  @Input() checked: boolean = false;

  isDeleted = false

  constructor(private tasksService:TasksService){}

  deleteTask() {
    this.tasksService.deleteTask(this.taskId);
    this.isDeleted = true;
  }

  toggleCheckbox() {
    this.tasksService.toggleCheckbox(this.taskId);
  }
}
