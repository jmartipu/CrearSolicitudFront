import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = '';
  redirectUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')))
  }

  ngOnInit() {
    this.buildLoginForm()
  }
  buildLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50),]]
      }
    )
  }
  async login(submittedForm: FormGroup){
    this.authService.login(submittedForm.value.username, submittedForm.value.password).subscribe(authStatus => {
      if(authStatus.isAuthenticated){
        this.router.navigate([this.redirectUrl || '/'])
      }
    },
      error => (this.loginError = error))
  }
}
