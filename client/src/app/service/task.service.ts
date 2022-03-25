import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../model/Task';
const ROOT = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  listChangedEvent = new Subject<Task[]>();
  tasks: Task[] = [];

  constructor(private http: HttpClient) {}
  getTasks() {
    this.http.get(`${ROOT}/api/tasks`).subscribe((tasks) => {
      this.tasks = tasks as Task[];
      this.listChangedEvent.next(this.tasks);
    });
    return this.tasks;
  }

  addTask(task: Task) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (task && !task.title) {
      return;
    }
    this.http
      .post(`${ROOT}/api/task`, JSON.stringify(task), { headers })
      .subscribe((t: Task) => {
        this.tasks.push(t);
        this.listChangedEvent.next(this.tasks.slice());
      });
  }
  updateStatus(task) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put(`${ROOT}/api/task/${task._id}`, JSON.stringify(task), {
        headers,
      })
      .subscribe();
  }
  deleteTask(task) {
    const id = task._id;
    this.http.delete(`${ROOT}/api/task/${id}`).subscribe((task: any) => {
      const pos = this.tasks.findIndex((x: any) => x._id == task._id);
      this.tasks.splice(pos, 1);
      this.listChangedEvent.next(this.tasks);
    });
  }
}
