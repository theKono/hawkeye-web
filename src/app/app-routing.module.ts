import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '' }
    ]),
    HomeRoutingModule
  ],
  exports: [
    RouterModule,
    HomeRoutingModule
  ]
})
export class AppRoutingModule { }
