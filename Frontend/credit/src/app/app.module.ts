import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOfffice/all-template-front/all-template-front.component';
import { HeaderFrontComponent } from './FrontOfffice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOfffice/footer-front/footer-front.component';
import { HomeComponent } from './FrontOfffice/home/home.component';
import { ContactComponent } from './FrontOfffice/componants/contact/contact.component';
import { PaymentdetailsComponent } from './BackOffice/Components/paymentdetails/paymentdetails.component';
import { PaymentplanComponent } from './BackOffice/Components/paymentplan/paymentplan.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './BackOffice/Components/users/users.component';
import { AuthGuard } from './auth.guard';
import { TasksComponent } from './BackOffice/Components/tasks/tasks.component';
import { PerformanceComponent } from './BackOffice/Components/performance/performance.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksdispalyComponent } from './FrontOfffice/componants/tasksdispaly/tasksdispaly.component';
import { PerformancedispalayComponent } from './FrontOfffice/componants/performancedispalay/performancedispalay.component'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { TeamComponent } from './BackOffice/Components/team/team.component';
import { ContractsComponent } from './BackOffice/Components/contracts/contracts.component';
import { SubmitcreditComponent } from './FrontOfffice/componants/submitcredit/submitcredit.component';
import { CreditComponent } from './BackOffice/Components/credit/credit.component';
import { EventComponent } from './BackOffice/Components/event/event.component';
import { ProfileComponent } from './FrontOfffice/componants/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    HeaderFrontComponent,
   FooterFrontComponent,
   ContractsComponent,
   SubmitcreditComponent,
   CreditComponent,
   HomeComponent,
   ContactComponent,
   PaymentdetailsComponent,
   UsersComponent,
   LoginComponent,
   TasksComponent,
   PerformanceComponent,
   TasksdispalyComponent,
   PerformancedispalayComponent,
   TeamComponent,
   EventComponent,
   ProfileComponent,
   PaymentplanComponent
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
       HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    
  ],
  
  providers: [AuthGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }
