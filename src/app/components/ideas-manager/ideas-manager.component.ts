import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TaskInterface } from "./../../interfaces/index";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: "app-ideas-manager",
  templateUrl: "./ideas-manager.component.html",
  styleUrls: ["./ideas-manager.component.scss"],
})
export class IdeasManagerComponent {
  tasks!: TaskInterface[];

  form!: FormGroup;
  colors: string[] = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#9b59b6",
    "#1abc9c",
    "#f39c12",
  ];
  selectedColor: string = this.colors[0]; // Початковий колір

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.form = this.fb.group({
      color: [this.selectedColor, Validators.required],
      title: ["", [Validators.required, Validators.minLength(3)]],
    });

    this.tasksService.getDataObservable().subscribe((updatedData) => {
      this.tasks = updatedData;
    });
  }

  selectColorHandler() {
    this.selectedColor = this.form.get("color")?.value;
  }

  onSubmit() {
    if(this.form.valid){
      const color = this.form.get("color")?.value;
      const title = this.form.get("title")?.value;
      const newDate = new Date().toLocaleString()
  
      const Task = {
        id: newDate,
        title: title,
        color: color,
        createdAt: newDate,
        isChecked: false
      };
  
      this.tasksService.setTask(Task);
      this.form.get('title')?.setValue('');
  
      this.tasks = this.tasksService.getTasks();
    } else {
      console.log('Form not valid');
    }
  }
}

// ng build --configuration production --base-href "https://4svEXE.github.io/Just-ToDo/"
// angular-cli-ghpages --dir=dist/JustToDo