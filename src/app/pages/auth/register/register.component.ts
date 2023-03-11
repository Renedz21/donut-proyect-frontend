import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/auth-request/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;

  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getForm();
  }

  getForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      address: [''],
      email: [''],
      phone: [''],
      dni: [''],
      password: ['']
    });
  }

  register(): void {

    this.spinner.show();

    this.user.name = this.formGroup.value.name;
    this.user.address = this.formGroup.value.address;
    this.user.email = this.formGroup.value.email;
    this.user.phone = this.formGroup.value.phone;
    this.user.dni = this.formGroup.value.dni;
    this.user.password = this.formGroup.value.password;

    this.authService.register(this.user).subscribe({
      next: () => {
        this.spinner.hide();
        this.router.navigate(['/auth']);
      },
      error: () => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }

    })

  }


}
