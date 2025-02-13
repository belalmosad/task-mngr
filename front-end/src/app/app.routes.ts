import { Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
    {path: '', component: TaskListComponent},
    {path: 'create-task', component: CreateTaskComponent},
    {path: 'update-task', component: EditTaskComponent}
];
