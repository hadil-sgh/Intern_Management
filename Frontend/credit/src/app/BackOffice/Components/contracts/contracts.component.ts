import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'src/app/models/Contract';
import { Credit } from 'src/app/models/Credit';
import { User } from 'src/app/models/User';
import { ContractserviceService } from 'src/app/services/contractservice.service';
import { CreditserviceService } from 'src/app/services/creditservice.service';  
import { UserservicesService } from 'src/app/services/userservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contractForm!: FormGroup;
  selectedContract!: Contract | null;
  isEditMode: boolean = false;
  credits: Credit[] = [];  
  contracts: Contract[] = [];
  userMap: { [key: number]: string } = {}; 

  pdfurl = '';
  @ViewChild('popupview') popupview: any; 

  constructor(
    private fb: FormBuilder,
    private contractService: ContractserviceService,
    private creditService: CreditserviceService,
    private userService: UserservicesService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllContracts(); 
    this.getAllCredits();   
  }
  
  loadUserNames(): void {
    this.credits.forEach(credit => {
      this.userService.getUserById(credit.userId).subscribe(
        (user: User) => {
          this.userMap[credit.userId] = `${user.nom} ${user.prenom}`; 
          console.log(`User map updated: ${credit.userId} -> ${this.userMap[credit.userId]}`);
        },
        error => console.error(`Error fetching user with ID: ${credit.userId}`, error)
      );
    });
  }
  
  getUserFullName(userId: number): string {
    return this.userMap[userId] || 'Unknown User'; 
  }
  
  initializeForm(contract?: Contract): void {
    this.contractForm = this.fb.group({
      borrower: [contract?.borrower || '', Validators.required],
      interestRate: [contract?.interestRate || '', Validators.required],
      interestRateType: [contract?.interestRateType || 'FIXED', Validators.required],
      collateralDescription: [contract?.collateralDescription || '', Validators.required],
      residenceLocation: [contract?.residenceLocation || '', Validators.required],
      creditId: [contract?.creditId || '', Validators.required]  
    });
    this.selectedContract = contract || null;
  }

  displayContractPdf(id: number): void {
    this.contractService.generateContractPdf(id).subscribe((pdfBlob: Blob) => {
      const pdfUrl = URL.createObjectURL(pdfBlob);

      Swal.fire({
        title: 'Contract PDF',
        html: `
          <iframe src="${pdfUrl}" width="100%" height="500px" frameborder="0"></iframe>
        `,
        showCloseButton: true,
        width: '80%',
        heightAuto: false
      });
    });
  }

  getAllContracts(): void {
    this.contractService.getAllContracts().subscribe({
      next: (data: Contract[]) => {
        this.contracts = data;
      },
      error: (error: any) => console.error('Error fetching contracts', error)
    });
  }

  getAllCredits(): void {
    this.creditService.getAllCredits().subscribe({
      next: (data: Credit[]) => {
        this.credits = data;
        console.log('Fetched credit list:', this.credits);
        this.loadUserNames(); 
      },
      error: (error: any) => console.error('Error fetching credits', error)
    });
  }

  onSubmit(): void {
    if (this.contractForm.invalid) {
      return;
    }

    const contractData = this.contractForm.value;

    if (this.isEditMode) {
      this.contractService.updateContract(this.selectedContract!.id, contractData).subscribe({
        next: () => {
          Swal.fire('Success', 'Contract updated successfully', 'success');
          this.getAllContracts(); 
          this.initializeForm();
        },
        error: (error: HttpErrorResponse) => Swal.fire('Error', `Failed to update contract: ${error.message}`, 'error')
      });
    } else {
      this.contractService.createContract(contractData).subscribe({
        next: () => {
          Swal.fire('Success', 'Contract created successfully', 'success');
          this.getAllContracts(); 
          this.initializeForm();
        },
        error: (error: HttpErrorResponse) => Swal.fire('Error', `Failed to create contract: ${error.message}`, 'error')
      });
    }
  }

  onAddContract(): void {
    this.isEditMode = false;
    this.initializeForm();
  }

  onEditContract(contract: Contract): void {
    this.isEditMode = true;
    this.initializeForm(contract);
  }

  onDeleteContract(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contractService.deleteContract(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Contract has been deleted.', 'success');
            this.getAllContracts(); 
          },
          error: (error: HttpErrorResponse) => Swal.fire('Error', `Failed to delete contract: ${error.message}`, 'error')
        });
      }
    });
  }
}
