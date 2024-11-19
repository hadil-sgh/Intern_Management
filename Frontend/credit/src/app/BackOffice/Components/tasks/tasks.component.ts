import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { UserservicesService } from 'src/app/services/userservices.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  users: User[] = []; 
  isEditMode = false;
  selectedTaskId?: number;

  statusList = ['TODO', 'IN_PROGRESS', 'DONE'];
  priorityList = ['Low', 'Medium', 'High'];

  constructor(
    private taskService: TaskServiceService,
    private userService: UserservicesService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers(); 
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onAddTask(): void {
    this.isEditMode = false;
    this.taskForm.reset();
  }

  onEditTask(task: Task): void {
    this.isEditMode = true;
    this.selectedTaskId = task.id;
    this.taskForm.patchValue({
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      userId: task.userId
    });
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (this.isEditMode && this.selectedTaskId) {
        this.taskService.updateTask(this.selectedTaskId, task).subscribe(() => {
          this.loadTasks();
        });
      } else {
        this.taskService.createTask(task).subscribe(() => {
          this.loadTasks();
        });
      }
    }
  }

  getStatusImage(status: string): string {
    switch (status) {
      case 'DONE':
        return '/assets/BackOffice/img/done.png';
      case 'IN_PROGRESS':
        return '/assets/BackOffice/img/progress.png';
      case 'TODO':
        return '/assets/BackOffice/img/todo.png';
      default:
        return '/assets/BackOffice/img/performance.png';
    }
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.nom+" "+user.prenom : 'Unknown';
  }
}