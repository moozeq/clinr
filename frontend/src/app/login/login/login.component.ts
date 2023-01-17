import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  @ViewChild('toastElement', { static: true }) toastEl!: ElementRef;
  toast!: Toast;
  errorIcon = faExclamationTriangle;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  login(): void {
    const loginUser = this.userForm.value;
    if (!loginUser.username || !loginUser.password) {
      throw new Error('Empty username or password is not allowed!');
    }
    this.authService.login(loginUser.username, loginUser.password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.user);

        this.isLoggedIn = true;
        this.isLoginFailed = false;

        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
        this.showErrorToast();
      }
    })
  }

  // TODO: Make toasts service.
  showErrorToast(): void {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      {
        delay: 5000
      }
    );
    this.toast.show();
  }

  reloadPage(): void {
    window.location.reload();
  }
}