import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './template/nav/nav.component';
import { DatePipe } from './shared/pipe/date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CarteiraComponent } from './carteira/carteira.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormComponent } from './form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlterarComponent } from './alterar/alterar.component';
import { DeletarComponent } from './deletar/deletar.component';
import { BoletimFocusComponent } from './boletim-focus/boletim-focus.component';
import { registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AporteComponent } from './aporte/aporte.component';
registerLocaleData(localePt)
@NgModule({

  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    DatePipe,
    CarteiraComponent,
    FormComponent,
    AlterarComponent,
    DeletarComponent,
    BoletimFocusComponent,
    AporteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, {
    provide: LOCALE_ID,
    useValue: 'pt-BR',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL',
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
