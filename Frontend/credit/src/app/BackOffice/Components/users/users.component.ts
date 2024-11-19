import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserservicesService } from 'src/app/services/userservices.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  editingUser: boolean = false; 
  selectedUserId: number | null = null;
users!: User[];
  constructor(private formBuilder: FormBuilder, private userService: UserservicesService) {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      NumTel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      role: ['USER', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getall();

  }
  get f() {
    return this.userForm.controls;
  }
  getall(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users; 
        console.log(this.users); 
      },
      (error) => {
        console.error('Error fetching users:', error); 
        Swal.fire('Error!', 'An error occurred while fetching users.', 'error');
      }
    );
  }
  

  submitUser(): void {
    console.log('Form submitted'); 
    if (this.userForm.invalid) {
      console.log('Form is invalid');
      return; 
    }
  
    if (this.editingUser && this.selectedUserId) {
      console.log('Updating user');
  
      this.userService.updateUser(this.selectedUserId, this.userForm.value).subscribe(
        response => {
          Swal.fire('Success!', 'User updated successfully!', 'success');
          this.resetForm();
        },
        error => {
          Swal.fire('Error!', 'An error occurred while updating the user.', 'error');
        }
      );
    } else {
      console.log('Creating user');
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          Swal.fire('Success!', 'User created successfully!', 'success');
          this.resetForm();
        },
        error => {
          Swal.fire('Error!', 'An error occurred while creating the user.', 'error');
        }
      );
    }
  }
  

  editUser(user: any): void {
    this.userForm.patchValue(user);
    this.editingUser = true;
    this.selectedUserId = user.id;
  }

  resetForm(): void {
    this.userForm.reset();
    this.editingUser = false;
    this.selectedUserId = null;
  }

  deleteUser(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          response => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error => {
            Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
          }
        );
      }
    });
  }
}
