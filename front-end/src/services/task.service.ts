import { Injectable } from "@angular/core";
import { Task } from "../types/task.type";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    task!: Task;

    getTask() {
        return this.task;
    }
    setTask(task: Task) {
        this.task = task;
    }
}