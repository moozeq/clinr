import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { EventType } from 'src/app/toasts/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userForm = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  login(): void {
    const loginUser = this.userForm.value;
    if (this.userForm.invalid || !loginUser.userId || !loginUser.password) {
      throw new Error('Invalid fields!');
    }
    this.authService.login(loginUser.userId, loginUser.password)
      .subscribe({
        next: (data) => {
          if (data)
            this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastService.showToast(EventType.Error, 'Wrong credentials', err.message);
        }
      })
  }
}