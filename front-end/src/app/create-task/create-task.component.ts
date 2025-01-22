import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-task',
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
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  private _snackBar = inject(MatSnackBar);
  taskForm!: FormGroup;
  statuses: string[] = ['Done', 'In progress'];
  submittedData: any;
  constructor(
    private fb: FormBuilder,
    private service: HttpService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required], 
      status: ['', Validators.required] 
    });
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      this.service.addTask(this.taskForm.value).subscribe(data => {
        this.submittedData = data
        this.router.navigate(['/']);
        this.openSnackBar(`New task with id ${this.submittedData.id}`, 'Close')
      })
    } else {
      console.log('Form is invalid');
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
