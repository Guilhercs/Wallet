import { FormComponent } from './form/form.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "carteira", component: CarteiraComponent},
  {path: "form", component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
