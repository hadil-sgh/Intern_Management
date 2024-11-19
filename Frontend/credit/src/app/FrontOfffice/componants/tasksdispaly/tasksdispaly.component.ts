import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { TaskServiceService } from 'src/app/services/task-service.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tasksdispaly',
  templateUrl: './tasksdispaly.component.html',
  styleUrls: ['./tasksdispaly.component.css'],
})
export class TasksdispalyComponent implements OnInit {
  TaskList: Task[] = [];
  itemsPerPage: number = 4;
  p: number = 1;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private TaskService: TaskServiceService
  ) {}

  ngOnInit(): void {
    this.getUserIdFromToken();
    this.loadUserPerformances();
  }

  getUserIdFromToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        console.log('Decoded Token:', decodedToken);
        this.userId =
          decodedToken.userId || decodedToken.id || decodedToken.sub;
        console.log('Decoded userId:', this.userId);

        const tokenExpiry = decodedToken.exp;
        if (tokenExpiry && !this.isTokenValid(tokenExpiry)) {
          console.error('Token has expired');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found in local storage');
    }
  }

  loadUserPerformances(): void {
    if (this.userId) {
      this.TaskService.getTasksByUserId(this.userId).subscribe(
        (data: Task[]) => {
          console.log('Task list data:', data);
          this.TaskList = data;
        },
        (error: any) => {
          console.error('Error loading task list:', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }

  private isTokenValid(expiry: number): boolean {
    const now = Math.floor(Date.now() / 1000);
    return now < expiry;
  }

  Edit(task: Task): void {
    this.TaskService.updateTask(task.id, task).subscribe(
      () => {
        console.log('Task updated successfully');
        this.loadUserPerformances();
      },
      (error: any) => {
        console.error('Error updating task:', error);
      }
    );
  }
}
