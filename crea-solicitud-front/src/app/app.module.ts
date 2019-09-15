import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component'
import { SolicitudesService } from './solicitudes/solicitudes.service'
import { HttpClientModule } from '@angular/common/http'
import { AuthService} from "./auth/auth.service";
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [AppComponent, ListaServiciosComponent, LoginComponent, LogoutComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [SolicitudesService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
