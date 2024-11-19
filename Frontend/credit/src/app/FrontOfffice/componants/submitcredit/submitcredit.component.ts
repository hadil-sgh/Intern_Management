import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credit } from 'src/app/models/Credit';
import { CreditserviceService } from 'src/app/services/creditservice.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-submitcredit',
  templateUrl: './submitcredit.component.html',
  styleUrls: ['./submitcredit.component.css']
})
export class SubmitcreditComponent implements OnInit {
  creditForm!: FormGroup;
  userId!: number; 

  constructor(private fb: FormBuilder, private creditService: CreditserviceService) { }

  ngOnInit(): void {
    this.creditForm = this.fb.group({
      creditType: ['', Validators.required],
      creditStatus: [{ value: 'PENDING', disabled: true }, Validators.required], 
      creditAmount: [0, [Validators.required, Validators.min(1)]],
      creditDuration: [1, [Validators.required, Validators.min(1)]]
    });

    this.getUserIdFromToken(); 
  }

  getUserIdFromToken(): void {
    const token = localStorage.getItem('token'); 
  
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); 
        console.log('Decoded Token:', decodedToken);
        
        this.userId = decodedToken.userId || decodedToken.id || decodedToken.sub; 
        console.log('Decoded userId:', this.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found in local storage');
    }
  }
  
  onSubmit(): void {
    if (this.creditForm.valid) {
      const creditData: Credit = {
        id: 0, 
        creditType: this.creditForm.value.creditType,
        creditStatus: this.creditForm.value.creditStatus || 'PENDING',
        creditAmount: this.creditForm.value.creditAmount,
        creditDuration: this.creditForm.value.creditDuration,
        userId: this.userId 
      };

      this.creditService.createCredit(creditData).subscribe(
        (response: any) => {
          console.log('Credit created successfully:', response);
        },
        (error: any) => {
          console.error('Error creating credit:', error);
        }
      );
    }
  }

  cancel(): void {
    this.creditForm.reset();
  }
}
