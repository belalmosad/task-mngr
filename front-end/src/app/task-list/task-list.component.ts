import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { NgFor, NgIf } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [
    NgFor, 
    TaskItemComponent, 
    MatGridListModule, 
    MatButtonModule, 
    MatIconModule,
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent  {
  data: any;
  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.service.getTasks().subscribe((data) => {
      this.data = data;
    });
  }

  onDeleteTask(taskId: any): void {
    this.data = this.data.filter((item: any) => {
      return item.id != taskId
    })
  }
}
