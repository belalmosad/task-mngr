import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseRoute = '/service'
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Object> {
    return this.http.get(`${this.baseRoute}/tasks`);
  }
  addTask(data: any): Observable<object> {
    return this.http.post(`${this.baseRoute}/tasks`, data);
  }
  deleteTask(taskId: any) {
    return this.http.delete(`${this.baseRoute}/task/${taskId}`);
  }
  updateTask(taskItem: Task) {
    return this.http.patch(`${this.baseRoute}/task/${taskItem.id}`,
      { "name": taskItem.name, "status": taskItem.status }
    );
  }
}
