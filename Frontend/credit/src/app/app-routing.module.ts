import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOfffice/all-template-front/all-template-front.component';
import { ContractsComponent } from './BackOffice/Components/contracts/contracts.component';
import { CreditComponent } from './BackOffice/Components/credit/credit.component';
import { HomeComponent } from './FrontOfffice/home/home.component';
import { SubmitcreditComponent } from './FrontOfffice/componants/submitcredit/submitcredit.component';
import { PaymentplanComponent } from './BackOffice/Components/paymentplan/paymentplan.component';
import { PaymentdetailsComponent } from './BackOffice/Components/paymentdetails/paymentdetails.component';
import { UsersComponent } from './BackOffice/Components/users/users.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './BackOffice/Components/tasks/tasks.component';
import { PerformanceComponent } from './BackOffice/Components/performance/performance.component';
import { TasksdispalyComponent } from './FrontOfffice/componants/tasksdispaly/tasksdispaly.component';
import { PerformancedispalayComponent } from './FrontOfffice/componants/performancedispalay/performancedispalay.component';
import { TeamComponent } from './BackOffice/Components/team/team.component';
import { EventComponent } from './BackOffice/Components/event/event.component';
import { ProfileComponent } from './FrontOfffice/componants/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AllTemplateBackComponent,

    children: [
      { path: 'contract', component: ContractsComponent },
      { path: 'credit', component: CreditComponent },
      { path: 'PaymentPlans', component: PaymentplanComponent },
      { path: 'PaymentDetails', component: PaymentdetailsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'Performance', component: PerformanceComponent },
      { path: 'task', component: TasksComponent },
      { path: 'event', component: EventComponent },
      { path: 'team', component: TeamComponent },
    ]
  },
  {
    path: 'student',
    component: AllTemplateFrontComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'loan', component: SubmitcreditComponent },
      { path: 'task', component: TasksdispalyComponent },
      { path: 'Performance', component: PerformancedispalayComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },



 { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
