import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  // {path: '', redirectTo:'/home', pathMatch:'full'},
  // {path: 'home',component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:redirectUrl', component: LoginComponent},
  {path: 'logout', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
