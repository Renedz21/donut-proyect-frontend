import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/models/auth-request/auth.class';
import { Session } from 'src/app/models/session.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  auth: Auth = new Auth();
  savedSession: Session | undefined;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.savedSession = this.authService.getSession();
    if (this.savedSession?.authenticated) this.redirectToHome();
  }

  ngOnInit() {
    this.getFormControl();

    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.returnUrl = res.returnUrl;
    })

  }

  getFormControl(): void {
    this.formGroup = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  onSubmit(): void {

    this.auth.email = this.formGroup.value.email;
    this.auth.password = this.formGroup.value.password;

    this.authService.login(this.auth).subscribe({
      next: (response) => {
        console.log(response)
        let session = new Session(response.token, response.user);
        this.authService.saveSession(session);
        if (this.returnUrl) {
          this.router.navigateByUrl(`${this.returnUrl}`);
        }
        this.redirectToHome();
      }
    })
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

}
