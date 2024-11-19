import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/models/Credit';
import { User } from 'src/app/models/User';
import { CreditserviceService } from 'src/app/services/creditservice.service';
import { UserservicesService } from 'src/app/services/userservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  credits: Credit[] = [];
  pendingCredits: Credit[] = [];
  otherCredits: Credit[] = [];
  selectedCredit: Credit | null = null;
  isModalOpen = false;
  userMap: { [key: number]: string } = {}; 
  selectedCreditIds: Set<number> = new Set<number>(); // Track selected credit IDs

  constructor(
    private creditService: CreditserviceService,
    private userService: UserservicesService
  ) { }

  ngOnInit(): void {
    this.loadCredits();
  }

  loadCredits(): void {
    this.creditService.getAllCredits().subscribe(
      data => {
        this.credits = data;
        this.pendingCredits = this.credits.filter(credit => credit.creditStatus === 'PENDING');
        this.otherCredits = this.credits.filter(credit => credit.creditStatus !== 'PENDING');
        this.loadUserNames(); 
      },
      error => console.error('Error fetching credits', error)
    );
  }

  loadUserNames(): void {
    this.credits.forEach(credit => {
      this.userService.getUserById(credit.userId).subscribe(
        (user: User) => {
          this.userMap[credit.userId] = `${user.nom} ${user.prenom}`; 
        },
        error => console.error(`Error fetching user with ID: ${credit.userId}`, error)
      );
    });
  }

  toggleSelection(creditId: number, event: any): void {
    if (event.target.checked) {
      this.selectedCreditIds.add(creditId);
    } else {
      this.selectedCreditIds.delete(creditId);
    }
  }

  toggleAllSelection(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.pendingCredits.forEach(credit => this.selectedCreditIds.add(credit.id));
      this.otherCredits.forEach(credit => this.selectedCreditIds.add(credit.id));
    } else {
      this.selectedCreditIds.clear();
    }
  }

  deleteSelectedCredits(): void {
    const selectedIds = Array.from(this.selectedCreditIds);
    if (selectedIds.length === 0) {
      Swal.fire('No selection', 'Please select at least one credit to delete.', 'info');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the selected credits. This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete them!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.creditService.deleteMultipleCredits(selectedIds).subscribe(
          () => {
            Swal.fire('Deleted!', 'The selected credits have been deleted.', 'success');
            this.loadCredits();
            this.selectedCreditIds.clear();
          },
          error => {
            Swal.fire('Error!', 'There was an error deleting the credits.', 'error');
            console.error('Error deleting credits', error);
          }
        );
      }
    });
  }

  openEditModal(credit: Credit): void {
    this.selectedCredit = { ...credit };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCredit = null;
  }

  updateCreditStatus(): void {
    if (this.selectedCredit) {
      this.creditService.updateCreditStatusWithEmail(this.selectedCredit.id, this.selectedCredit).subscribe(
        updatedCredit => {
          this.closeModal();
          this.loadCredits();
          Swal.fire('Success', 'Credit status updated successfully', 'success');
        },
        error => Swal.fire('Error', 'Error updating credit status', 'error')
      );
    }
  }

  deleteCredit(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.creditService.deleteCredit(id).subscribe(
          () => {
            this.loadCredits(); 
            Swal.fire('Deleted!', 'The credit has been deleted.', 'success');
          },
          error => Swal.fire('Error', 'Error deleting credit', 'error')
        );
      }
    });
  }

  getUserFullName(userId: number): string {
    return this.userMap[userId] || 'Loading...'; 
  }
}
