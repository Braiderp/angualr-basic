import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/model/Task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  title: string;
  subscription: Subscription;

  constructor(private taskService: TaskService) {}
  addTask(e: any) {
    e.preventDefault();
    const task = new Task(this.title, false);
    this.taskService.addTask(task);
    this.title = '';
  }
  updateStatus(task: Task) {
    task.isDone = !task.isDone;
    this.taskService.updateStatus(task);
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.subscription = this.taskService.listChangedEvent.subscribe(
      (list: Task[]) => {
        this.tasks = list;
      }
    );
  }
}
