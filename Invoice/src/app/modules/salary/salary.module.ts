import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { SalaryComponent } from './salary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SalaryComponent,
  ],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SalaryModule { }
