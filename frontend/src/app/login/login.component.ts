import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoggedUser, LoggedUserDto, LoginUser, LoginUserDto } from '../dto/user.dto';
import { TokenStorageService } from '../token-storage.service';
import { Toast } from 'bootstrap';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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
    const loginUser = new LoginUser(this.userForm.value as LoginUserDto);
    if (!loginUser.username || !loginUser.password) {
      throw new Error('Empty username or password is not allowed!');
    }
    this.authService.login(loginUser.username, loginUser.password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(new LoggedUser(data.user as LoggedUserDto));

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
