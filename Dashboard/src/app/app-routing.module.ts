import { BoletimFocusComponent } from './boletim-focus/boletim-focus.component';
import { DeletarComponent } from './deletar/deletar.component';
import { AlterarComponent } from './alterar/alterar.component';
import { FormComponent } from './form/form.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "carteira", component: CarteiraComponent},
  {path: "form", component: FormComponent},
  {path: "boletim", component: BoletimFocusComponent},
  {path: "alterar/:id", component: AlterarComponent},
  {path: "deletar/:id", component: DeletarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
