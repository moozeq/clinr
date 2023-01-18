import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/toasts/toast.service';
import { EventType } from 'src/app/toasts/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    username: ['', [Validators.required, Validators.maxLength(32), Validators.pattern("^[a-zA-Z0-9]+$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { }

  register(): void {
    const registerUser = this.userForm.value;
    if (this.userForm.invalid || !registerUser.username || !registerUser.password || !registerUser.name || !registerUser.email) {
      throw new Error('Invalid fields!');
    }
    this.authService.register(registerUser.username, registerUser.password, registerUser.name, registerUser.email)
      .subscribe({
        next: (user) => {
          this.toastService.showToast(EventType.Success, `User "${user.username}" successfully registered!`, `You can log in now.`);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toastService.showToast(EventType.Error, 'Something went wrong', err.message);
        }
      })
  }
}
