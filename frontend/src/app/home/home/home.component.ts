import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logged = false;
  loading = true;
  user: any;

  constructor(private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  subscribeToUser(): void {
    this.authService.isLogged.subscribe(logged => {
      this.logged = logged;
      if (logged) {
        this.usersService.getUserProfile().subscribe(() => {
          this.loading = false;
          this.user = this.usersService.user;
        })
      }
    });
    this.authService.checkStatus();
  }
}
