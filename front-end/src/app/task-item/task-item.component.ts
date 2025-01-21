import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Task } from '../../types/task.type';
import { CommonModule, DatePipe } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { HttpService } from '../http.service';

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
    private service: HttpService
  ) {}

  deleteTask(taskId: any) {
    this.service.deleteTask(taskId).subscribe(dat => {
      this.deleteTaskEvent.emit(taskId)
    });
  }

}
