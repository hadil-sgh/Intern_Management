import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/User';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: Team[] = [];
  teamForm: FormGroup;
  isEditMode = false;
  selectedTeamId?: number;
  users: User[] = [];

  constructor(
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {
    this.teamForm = this.formBuilder.group({
      name: ['', Validators.required],
      userIds: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadUsers(): void {
    this.teamService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.loadTeams(); // Load teams after users are loaded
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe(
      (teams: Team[]) => {
        this.teams = teams
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  onAddTeam(): void {
    this.isEditMode = false;
    this.teamForm.reset({ userIds: [] });
  }

  onDeleteTeam(id: number): void {
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
        this.teamService.deleteTeam(id).subscribe(
          () => {
            this.loadTeams();
            Swal.fire('Deleted!', 'Your team has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting team:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting your team.',
              'error'
            );
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      const team: Team = {
        ...this.teamForm.value,
        id: this.isEditMode && this.selectedTeamId ? this.selectedTeamId : 0,
      };

      if (this.isEditMode && this.selectedTeamId) {
        this.teamService.updateTeam(team).subscribe(
          () => {
            this.loadTeams();
            this.teamForm.reset();
            this.isEditMode = false;
          },
          (error) => {
            console.error('Error updating team:', error);
            Swal.fire('Error!', 'There was a problem updating the team.', 'error');
          }
        );
      } else {
        this.teamService.createTeam(team).subscribe(
          () => {
            this.loadTeams();
            this.teamForm.reset();
          },
          (error) => {
            console.error('Error creating team:', error);
            Swal.fire('Error!', 'There was a problem creating the team.', 'error');
          }
        );
      }
    }
  }

  addMemberToTeam(teamId: number, userId: number) {
    this.teamService.addMemberToTeam(teamId, userId).subscribe(
      () => this.loadTeams(),
      (error) => {
        console.error('Error adding member to team:', error);
      }
    );
  }
}
