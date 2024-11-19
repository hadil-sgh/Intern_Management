export interface User {
    id: number;
    userName: string;
    password: string;
    nom: string;
    prenom: string;
    email: string;
    dateNaissance: string; 
    cin: number;
    NumTel: number;
    role: 'ADMIN' | 'USER' | 'MANAGER';
  }
  