import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../types/task.type';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-edit-task',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CommonModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  private _snackBar = inject(MatSnackBar);
  taskToUpdate!: Task;
  statuses: string[] = ["Done", "In progress"];
  taskForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.taskToUpdate = this.taskService.getTask();
    this.taskForm = this.formBuilder.group({
      name: [this.taskToUpdate?.name, Validators.required],
      status: [this.taskToUpdate?.status, Validators.required]
    })
  }

  onSubmit(taskForm: any) {
    const submittedData: Task = taskForm.value;
    this.taskToUpdate = {...this.taskToUpdate,...submittedData}
    this.httpService.updateTask(this.taskToUpdate).subscribe(data => {
      this.router.navigate([''])
      this.openSnackBar(`Task No. ${this.taskToUpdate.id} updated successfully`, 'Cancel')
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
