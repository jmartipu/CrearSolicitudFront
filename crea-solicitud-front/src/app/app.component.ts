import {Component, OnInit} from '@angular/core'
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  displayLogin = true;
  title = 'crea-solicitud-front';
  constructor(private authService: AuthService){

  }
  ngOnInit() {
    this.displayLogin = !this.authService.isAuthenticated()
  }
}
