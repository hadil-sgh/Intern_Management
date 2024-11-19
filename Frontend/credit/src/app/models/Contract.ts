export interface Contract {
  id: number;
  contractReference: string;
  borrower: string;
  interestRate: number;
  interestRateType: 'FIXED' | 'VARIABLE';
  collateralDescription?: string;  
  residenceLocation: string;
  creditId?: number;  
}
