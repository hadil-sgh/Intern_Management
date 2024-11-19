import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepaymentService } from 'src/app/services/repayment.service';
@Component({
  selector: 'app-paymentplan',
  templateUrl: './paymentplan.component.html',
  styleUrls: ['./paymentplan.component.css']
})
export class PaymentplanComponent implements OnInit {
  repaymentPlans: any[] = [];
  selectedRepaymentPlan: any = null;
  repaymentPlanForm: any = {
    dueDate: '',
    startingBalance: 0,
    startingBalanceReimbursementAmount: 0,
    repaymentOfCapital: 0,
    remainingDueBalance: 0,
    interestAndCumulate: 0,
    creditId: null,
    paymentDetailsId: null
  };
  showModal = false; // Controls the modal visibility

  constructor(private repaymentPlanService: RepaymentService) {}

  ngOnInit(): void {
    this.loadRepaymentPlans();
  }

  // Load all repayment plans
  loadRepaymentPlans(): void {
    this.repaymentPlanService.getRepaymentPlans().subscribe(
      (data) => {
        this.repaymentPlans = data;
      },
      (error) => {
        console.error('Error loading repayment plans:', error);
      }
    );
  }

  // Open modal for creating or editing repayment plan
  openModal(repaymentPlan: any = null): void {
    this.selectedRepaymentPlan = repaymentPlan;
    if (repaymentPlan) {
      this.repaymentPlanForm = { ...repaymentPlan };
    } else {
      this.repaymentPlanForm = {
        dueDate: '',
        startingBalance: 0,
        startingBalanceReimbursementAmount: 0,
        repaymentOfCapital: 0,
        remainingDueBalance: 0,
        interestAndCumulate: 0,
        creditId: null,
        paymentDetailsId: null
      };
    }
    this.showModal = true;
  }

  // Close the modal
  closeModal(): void {
    this.showModal = false;
  }

  // Create or update repayment plan
  saveRepaymentPlan(): void {
    if (this.selectedRepaymentPlan) {
      this.repaymentPlanService.updateRepaymentPlan(this.selectedRepaymentPlan.id, this.repaymentPlanForm).subscribe(
        (data) => {
          this.loadRepaymentPlans();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating repayment plan:', error);
        }
      );
    } else {
      this.repaymentPlanService.createRepaymentPlan(this.repaymentPlanForm).subscribe(
        (data) => {
          this.loadRepaymentPlans();
          this.closeModal();
        },
        (error) => {
          console.error('Error creating repayment plan:', error);
        }
      );
    }
  }

  // Delete repayment plan
  deleteRepaymentPlan(id: number): void {
    if (confirm('Are you sure you want to delete this repayment plan?')) {
      this.repaymentPlanService.deleteRepaymentPlan(id).subscribe(
        (data) => {
          this.loadRepaymentPlans();
        },
        (error) => {
          console.error('Error deleting repayment plan:', error);
        }
      );
    }
  }
}