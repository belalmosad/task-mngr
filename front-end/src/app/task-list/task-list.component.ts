import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NgFor, NgIf } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-list',
  imports: [
    NgFor,
    TaskItemComponent,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatPaginatorModule,
    RouterLink,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  data: any;
  tasksCount: any;
  currentOffset = 0;
  downloadReady = false;
  downlodUrl!: string;
  showSpinner: boolean = false;
  constructor(private service: HttpService) { }

  ngOnInit(): void {
    this.service.getTasks(this.currentOffset).subscribe((data) => {
      this.data = data;
    });
    this.service.getTasksCount().subscribe((data: any) => {
      this.tasksCount = data.count;
    })
  }

  onDeleteTask(taskId: any): void {
    this.service.getTasks(this.currentOffset).subscribe((data) => {
      this.data = data;
    });
    this.tasksCount = this.tasksCount - 1;
  }

  onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    const offSetBase = 5;
    this.currentOffset = (pageIndex * offSetBase)
    this.service.getTasks(this.currentOffset).subscribe((data) => {
      this.data = data;
    });
  }

  exportToCSV() {
    this.showSpinner = true;
    this.service.exportTasks().subscribe((res) => {
      this.showSpinner = false;
      const objUrl = URL.createObjectURL(res);
      this.downloadReady = true;
      this.downlodUrl = objUrl;
    })
  }
}

