import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '',   redirectTo: '/salary', pathMatch: 'full' },

  { path: 'salary', loadChildren: () => import('./modules/salary/salary.module').then(m => m.SalaryModule)}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
