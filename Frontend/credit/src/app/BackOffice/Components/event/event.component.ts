import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserservicesService } from 'src/app/services/userservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventForm: FormGroup;
  isEditMode = false;
  selectedEventId?: number;
  users1: User[] = [];
  eventTypes = [
    'CONFERENCE',
    'SEMINAR',
    'ORIENTATION',
    'TRAINING',
    'TEAM_BUILDING',
    'MENTORSHIP_MEETING',
    'PROJECT_PRESENTATION',
    'HACKATHON',
    'PERFORMANCE_REVIEW',
    'NETWORKING',
    'CAREER_DEVELOPMENT',
    'SOCIAL_EVENT',
    'EXIT_INTERVIEW',
    'Q&A_SESSION',
    'COMPANY_OVERVIEW',
    'INTERNAL_COMPETITION',
  ];

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private userService: UserservicesService
  ) {
    this.eventForm = this.formBuilder.group({
      event: ['', Validators.required],
      date: ['', Validators.required],
      userIds: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadUsers();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users1 = users;
    });
  }

  onAddEvent(): void {
    this.isEditMode = false;
    this.eventForm.reset({ userIds: [] });
  }

  onEditEvent(event: Event): void {
    this.isEditMode = true;
    this.selectedEventId = event.id;
    this.eventForm.patchValue({
      event: event.event,
      date: event.date.toISOString().substring(0, 10),
      userIds: event.users,
    });
  }
  onAddMember(eventId: number, userId: number) {
    this.eventService.addMemberToEvent(eventId, userId).subscribe({
      next: (response) => {
        console.log('Member added to event successfully:', response);
      },
      error: (error) => {
        console.error('Error adding member to event:', error);
      },
    });
  }

 
  onDeleteEvent(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe(
          () => {
            this.loadEvents();
            Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting event:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting your event.',
              'error'
            );
          }
        );
      }
    });
  }

  getUserNames(userIds: User[]): string {
    return userIds.map((user) => `${user.nom} ${user.prenom}`).join(', ');
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: Event = {
        ...this.eventForm.value,
        date: new Date(this.eventForm.value.date),
      };

      if (this.isEditMode && this.selectedEventId) {
        event.id = this.selectedEventId;
        this.eventService.updateEvent(event).subscribe(
          (response) => {
            console.log('Event updated successfully:', response);
            this.loadEvents();
            Swal.fire('Updated!', 'Your event has been updated.', 'success');
          },
          (error) => {
            console.error('Error updating event:', error);
            Swal.fire(
              'Error!',
              'There was a problem updating your event.',
              'error'
            );
          }
        );
      } else {
        this.eventService.createEvent(event).subscribe(
          (response) => {
            console.log('Event created successfully:', response);
            this.loadEvents();
            Swal.fire('Created!', 'Your event has been created.', 'success');
          },
          (error) => {
            console.error('Error creating event:', error);
            Swal.fire(
              'Error!',
              'There was a problem creating your event.',
              'error'
            );
          }
        );
      }
    } else {
      this.logFormControlErrors();
      Swal.fire('Error!', 'Please fill out the form correctly.', 'error');
    }
  }

  logFormControlErrors(): void {
    Object.keys(this.eventForm.controls).forEach((key) => {
      const control = this.eventForm.get(key);
      if (control && control.errors) {
        console.log(`Control: ${key}, Errors:`, control.errors);
      }
    });
  }
}
