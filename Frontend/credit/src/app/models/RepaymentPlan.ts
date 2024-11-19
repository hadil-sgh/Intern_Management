export interface RepaymentPlan {
    id: number;
    dueDate: string; 
    startingBalance: number;
    startingBalanceReimbursementAmount: number;
    repaymentOfCapital: number;
    remainingDueBalance: number;
    interestAndCumulate: number;
    creditId?: number; 
    paymentDetailsId?: number; 
  }
  