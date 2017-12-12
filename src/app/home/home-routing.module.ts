import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QueryComponent } from '../query/query.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'query', component: QueryComponent }
        ]
      },
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class HomeRoutingModule { }
