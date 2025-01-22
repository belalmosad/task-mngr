import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Task } from '../../types/task.type';
import { CommonModule, DatePipe } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [
    DatePipe
  ]
})
export class TaskItemComponent {
  @Input() taskItem!: Task;
  @Output() deleteTaskEvent = new EventEmitter<number>();
  constructor(
    private httpService: HttpService,
    private router: Router,
    private taskService: TaskService
  ) {}

  deleteTask(taskId: any) {
    this.httpService.deleteTask(taskId).subscribe(dat => {
      this.deleteTaskEvent.emit(taskId)
    });
  }

  updateTask(taskItem: any) {
    this.taskService.setTask(taskItem);
    this.router.navigate(['update-task']);
  }

}
