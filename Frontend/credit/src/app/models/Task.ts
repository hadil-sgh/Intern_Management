export interface Task {
    id: number;
    description: string;
    dueDate: Date;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    userId: number;
  }
  