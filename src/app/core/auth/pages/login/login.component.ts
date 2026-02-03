import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginFacadeService} from "../../facades/login-facade.service";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  loginFacadeService = inject(LoginFacadeService);

  form = new FormGroup({
    user: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  submit() {
    console.log(this.form.invalid);
    if (this.form.invalid) {
      return;
    }

    const payload = {
      user: (this.form.controls.user.value ?? '') as string,
      password: (this.form.controls.password.value ?? '') as string,
    }
    this.loginFacadeService.login(payload)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 401) {
            this.form.setErrors({
              wrongCredentials: true,
            });
          }
        }
      })
  }
}
