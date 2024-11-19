import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Performance } from 'src/app/models/Performance';
import { PerformanceServiceService } from 'src/app/services/performance-service.service';
import { UserservicesService } from 'src/app/services/userservices.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  performanceList: Performance[] = []; 
  users: User[] = []; 
  performanceForm!: FormGroup;
  isEditMode: boolean = false;
  currentPerformance: any; 
  selectedStarsTeamWork: number = 0;
  selectedStarsDiscipline: number = 0;
  selectedStarsPunctuality: number = 0;
  constructor(
    private fb: FormBuilder,
    private performanceService: PerformanceServiceService,
    private Userservice: UserservicesService
  ) {}

  ngOnInit(): void {
    console.log('Initializing PerformanceComponent...');
    this.performanceForm = this.fb.group({
      grade: ['', ],
      comment: [''],
      week: ['', [Validators.required]],
      year: ['', [Validators.required]],
      userId: ['', [Validators.required]]
    });
    this.loadPerformanceList();
    this.loadUsers();
  }

  loadPerformanceList(): void {
    console.log('Loading performance list...');
    this.performanceService.getAllPerformances().subscribe((data: Performance[]) => {
      console.log('Performance list data:', data);
      this.performanceList = data;
    }, error => {
      console.error('Error loading performance list:', error);
    });
  }
  selectStars(starCount: number, category: string): void {
    switch (category) {
      case 'teamWork':
        this.selectedStarsTeamWork = starCount;
        break;
      case 'discipline':
        this.selectedStarsDiscipline = starCount;
        break;
      case 'punctuality':
        this.selectedStarsPunctuality = starCount;
        break;
    }
  }
  loadUsers(): void {
    console.log('Loading users...');
    this.Userservice.getUsers().subscribe((data: User[]) => {
      console.log('Users data:', data);
      this.users = data;
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  openAddPerformanceModal(): void {
    console.log('Opening add performance modal...');
    this.isEditMode = false;
    this.performanceForm.reset();
  }

  openEditPerformanceModal(performance: any): void {
    console.log('Opening edit performance modal for performance:', performance);
    this.isEditMode = true;
    this.currentPerformance = performance;
    this.performanceForm.patchValue(performance);
  }

  onSubmit(): void {
    const performance = this.performanceForm.value as Performance;
    const averageGrade = (this.selectedStarsTeamWork + this.selectedStarsDiscipline + this.selectedStarsPunctuality) / 3;
    performance.grade = averageGrade;

    console.log('Form submitted:');
    console.log('Grade:', performance.grade);
    console.log('Comment:', performance.comment);
    console.log('Week:', performance.week);
    console.log('Year:', performance.year);
    console.log('UserId:', performance.userId);

    console.log('Form validity:', this.performanceForm.valid);
    console.log('Control errors:');
    Object.keys(this.performanceForm.controls).forEach(controlName => {
        const control = this.performanceForm.get(controlName);
        if (control) {
            console.log(`${controlName} validity:`, control.valid);
            console.log(`${controlName} errors:`, control.errors);
        }
    });

    if (this.performanceForm.valid) {
        if (this.isEditMode) {
            console.log('Updating performance with ID:', this.currentPerformance?.idperformence);
            this.performanceService.updatePerformance(this.currentPerformance?.idperformence, performance).subscribe(() => {
                console.log('Performance updated successfully');
                this.loadPerformanceList();
            }, (error: any) => {
                console.error('Error updating performance:', error);
            });
        } else {
            console.log('Creating new performance');
            this.performanceService.createPerformance(performance).subscribe(() => {
                console.log('Performance created successfully');
                this.loadPerformanceList();
            }, (error: any) => {
                console.error('Error creating performance:', error);
            });
        }

     
    } else {
        console.log('Form is invalid:', this.performanceForm.errors);
    }
}




  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.nom+" "+user.prenom : 'Unknown';
  }
  deletePerformance(id: number): void {
    console.log('Deleting performance with ID:', id);
    this.performanceService.deletePerformance(id).subscribe(() => {
      console.log('Performance deleted successfully');
      this.loadPerformanceList();
    }, error => {
      console.error('Error deleting performance:', error);
    });
  }

  getStars(grade: number): string[] {
    console.log('Calculating stars for grade:', grade);
    const stars = [];
    const fullStars = Math.floor(grade);
    const halfStar = grade % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push('checked');
    }
    if (halfStar) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push(''); 
    }
    console.log('Stars array:', stars);
    return stars;
  }
}
